import { prisma } from '../../config';
import { PrismaClient, Raffle } from '@prisma/client';

interface CreateRaffleData {
  name: string;
  users_quantity: number;
  value: number;
  free:boolean;
  raffleSkins: {
    skin_id: number;
    skinName: string;
    skinValue: number;
    skinType: string;
    skinPicture: string;
  }[];
}

interface CreateOrUpdateParticipantParams {
  user_id: number;
  raffle_id: number;
  number: number;
  is_reserved: boolean;
  reserved_until: Date | null;
}

const createRaffle = async (data: CreateRaffleData): Promise<Raffle> => {
  return await prisma.raffle.create({
    data: {
      name: data.name,
      users_quantity: data.users_quantity,
      value: data.value,
      free: data.free,
      raffleSkins: {
        create: data.raffleSkins, // Aqui estamos criando múltiplas instâncias da mesma skin
      },
    },
  });
};

// Atualizar para retornar o campo is_paid e is_reserved
const getActiveRafflesWithDetails = async () => {
  const res = await prisma.raffle.findMany({
    where: {
      is_active: 'Ativa',
    },
    include: {
      raffleSkins: true, // Incluir todas as skins da rifa
      participants: {
        select: {
          id: true,
          number: true, // Número do participante
          is_reserved: true, // Retorna se o número está reservado
          is_paid: true, // Retorna se o número foi pago (novo campo)
          user: {
            select: {
              id: true,
              name: true,
              picture: true,
            },
          },
        },
      },
    },
  });
  console.log(res[1].participants)
  return res
};

// Similar para a função getAllRafflesWithDetails
const getAllRafflesWithDetails = async (page: number) => {
  return await prisma.raffle.findMany({
    include: {
      raffleSkins: true,
      participants: {
        select: {
          number: true,
          is_reserved: true,  // Novo campo reservado
          is_paid: true,      // Novo campo pago
          user: {
            select: {
              id: true,
              name: true,
              picture: true,
            },
          },
        },
      },
    },
    skip: (page - 1) * 10,
    take: 10,
    orderBy: {
      id: 'desc',
    },
  });
};

const postActiveRaffles = async (id: number) => {
  // Primeiro, buscamos a rifa para verificar seu estado atual
  const raffle = await prisma.raffle.findUnique({
    where: { id },
  });

  // Verificamos se a rifa está no estado "Em espera"
  if (!raffle || raffle.is_active !== 'Em espera') {
    throw new Error("A rifa não pode ser ativada porque não está no estado 'Em espera'.");
  }

  // Se estiver "Em espera", podemos prosseguir e ativá-la
  return await prisma.raffle.update({
    where: { id },
    data: { is_active: 'Ativa' },
  });
};

const deleteRaffle = async (id: number) => {
  // Primeiro, buscamos a rifa para verificar seu estado atual
  const raffle = await prisma.raffle.findUnique({
    where: { id },
  });

  // Verificamos se a rifa está no estado "Em espera"
  if (!raffle || raffle.is_active !== 'Em espera') {
    throw new Error("A rifa não pode ser ativada porque não está no estado 'Em espera'.");
  }

  // Se estiver "Em espera", podemos prosseguir e ativá-la
  await prisma.raffleSkin.deleteMany({
    where: {
      raffle_id: id,
    },
  });

  await prisma.participant.deleteMany({
    where: {
      raffle_id: id,
    },
  });

  return await prisma.raffle.delete({
    where: { id },
  });
};

async function calculateTotalCost(raffles: { id: number; quantity: number }[], prismaInstance: PrismaClient = prisma) {
  let totalCost = 0;
  for (const raffle of raffles) {
    const raffleData = await prismaInstance.raffle.findUnique({
      where: { id: raffle.id },
    });
    if (raffleData) {
      totalCost += raffleData.value * raffle.quantity;
    }
  }
  return totalCost;
}

async function findById(
  id: number,
  transaction: PrismaClient | null = null,
  options?: { includeParticipants?: boolean },
) {
  const prismaInstance = transaction || prisma;
  return prismaInstance.raffle.findUnique({
    where: { id },
    include: {
      participants: options?.includeParticipants ?? false,
    },
  });
}

async function createParticipant(
  userId: number,
  raffleId: number,
  quantity: number,
  prismaInstance: PrismaClient = prisma,
) {
  if (quantity <= 0) {
    throw new Error('Quantity must be greater than 0');
  }

  // Buscar os números já ocupados na rifa, ordenados em ordem crescente
  const existingParticipants = await prismaInstance.participant.findMany({
    where: {
      raffle_id: raffleId,
    },
    orderBy: {
      number: 'asc',
    },
    select: {
      number: true,
    },
  });

  // Cria um array para armazenar os números disponíveis
  const availableNumbers = [];
  let currentNumber = 1;
  let existingIndex = 0;

  // Identifica os próximos números disponíveis
  while (availableNumbers.length < quantity) {
    // Se o número atual não estiver ocupado, adicione-o à lista de disponíveis
    if (existingIndex >= existingParticipants.length || existingParticipants[existingIndex].number > currentNumber) {
      availableNumbers.push(currentNumber);
    } else {
      existingIndex++;
    }
    currentNumber++;
  }

  // Cria os participantes com os números disponíveis
  const participantsData = availableNumbers.map((number) => ({
    user_id: userId,
    raffle_id: raffleId,
    number,
  }));

  return prismaInstance.participant.createMany({
    data: participantsData,
  });
}

async function findParticipantByRaffleAndUser(raffleId: number, number: number) {
  return prisma.participant.findFirst({
    where: {
      raffle_id: raffleId,
      number: number,
    },
  });
}



async function addParticipantToRaffle(raffleId: number, userId: number, number: number) {
  return prisma.participant.create({
    data: {
      raffle_id: raffleId,
      user_id: userId,
      number: number,  // Número atribuído ao participante
    },
  });
}

async function removeParticipantFromRaffle(participantId: number) {
  return prisma.participant.delete({
    where: {
      id: participantId,
    },
  });
}

async function purchaseRaffleNumbers(
  userId: number,
  raffleId: number,
  quantity: number,
  prismaInstance: PrismaClient = prisma,
) {
  // @ts-ignore
  return await prismaInstance.$transaction(async (transaction) => {
    const raffleData = await transaction.raffle.findUnique({
      where: { id: raffleId },
      include: {
        participants: true,
      },
    });

    if (!raffleData) throw new Error(`Raffle with ID ${raffleId} not found`);

    const availableNumbers = raffleData.users_quantity - raffleData.participants.length;
    if (availableNumbers < quantity) {
      throw new Error('Not enough available raffle numbers');
    }

    const costPerNumber = raffleData.value / raffleData.users_quantity;
    const totalCost = costPerNumber * quantity;

    // Criar os participantes e marcar como is_paid = true
    const participantsData = Array.from({ length: quantity }, (_, i) => ({
      user_id: userId,
      raffle_id: raffleId,
      number: raffleData.participants.length + i + 1,
      is_paid: true,  // Marcar como pago
    }));

    await transaction.participant.createMany({
      data: participantsData,
    });

    // Decrementar saldo do usuário
    await transaction.user.update({
      where: { id: userId },
      data: {
        saldo: {
          decrement: totalCost,
        },
      },
    });

    // Criar a transação
    await transaction.transaction.create({
      data: {
        user: { connect: { id: userId } },
        raffle: { connect: { id: raffleId } },
        transactionAmount: totalCost,
        type: 'debit',
        status: 'completed',
        paymentMethod: 'balance',
      },
    });

    return {
      purchasedQuantity: quantity,
      totalCost,
    };
  });
}


async function clearExpiredReservations(now: Date) {
  await prisma.participant.updateMany({
    where: {
      reserved_until: {
        lte: now,
      },
      is_reserved: true,
    },
    data: {
      is_reserved: false,
      reserved_until: null,
    },
  });
}
async function findParticipantByRaffleAndNumber(raffleId: number, number: number) {
  return await prisma.participant.findFirst({
    where: {
      raffle_id: raffleId,
      number,
    },
  });
}
async function updateParticipantReservation(participantId: number, isReserved: boolean, reservedUntil: Date | null, isPaid:boolean) {
  return await prisma.participant.update({
    where: { id: participantId },
    data: {
      is_reserved: isReserved,
      reserved_until: reservedUntil,
      is_paid: isPaid,
    },
  });
}
async function createOrUpdateParticipant({ user_id, raffle_id, number, is_reserved, reserved_until }: CreateOrUpdateParticipantParams) {
  const existingParticipant = await prisma.participant.findFirst({
    where: {
      raffle_id,
      number,
    },
  });

  if (existingParticipant) {
    return await prisma.participant.update({
      where: { id: existingParticipant.id },
      data: {
        is_reserved,
        reserved_until,
      },
    });
  } else {
    return await prisma.participant.create({
      data: {
        user_id,
        raffle_id,
        number,
        is_reserved,
        reserved_until,
      },
    });
  }
}



export default {
  findParticipantByRaffleAndUser,
  updateParticipantReservation,
  findParticipantByRaffleAndNumber,
  addParticipantToRaffle,
  createOrUpdateParticipant,
  removeParticipantFromRaffle,
  createRaffle,
  purchaseRaffleNumbers,
  getActiveRafflesWithDetails,
  postActiveRaffles,
  getAllRafflesWithDetails,
  calculateTotalCost,
  createParticipant,
  clearExpiredReservations,
  deleteRaffle,
  findById,
};
