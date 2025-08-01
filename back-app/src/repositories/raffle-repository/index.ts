import { prisma } from '../../config';
import { PrismaClient, Raffle } from '@prisma/client';

interface CreateRaffleData {
  name: string;
  users_quantity: number;
  value: number;
  free: boolean;
  raffleSkins: {
    skin_id: number;
    skinName: string;
    skinValue: number;
    skinType: string;
    skinPicture: string;
  }[];
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

const getActiveRafflesWithDetails = async () => {
  return await prisma.raffle.findMany({
    where: {
      is_active: 'Ativa',
    },
    include: {
      raffleSkins: true, // Incluir todas as skins da rifa
      participants: {
        where: {
          OR: [{ is_paid: true }, { is_reserved: true }],
        },
        select: {
          id: true,
          is_paid: true,
          is_reserved: true,
          number: true, // Número do participante
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
};

const getActiveRafflesWithDetailsForRoulette = async () => {
  return await prisma.raffle.findMany({
    where: {
      is_active: 'Ativa',
    },
    include: {
      raffleSkins: true, // Incluir todas as skins da rifa
      participants: {
        where: {
          is_paid: true,
        },
        select: {
          id: true,
          is_paid: true,
          is_reserved: true,
          number: true, // Número do participante
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
};

const getAllRafflesWithDetails = async (page: number) => {
  return await prisma.raffle.findMany({
    include: {
      raffleSkins: true,
      participants: {
        select: {
          number: true,
          is_paid:true,
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
const postDisableRaffles = async (id: number) => {
  // Primeiro, buscamos a rifa para verificar seu estado atual
  const raffle = await prisma.raffle.findUnique({
    where: { id },
  });

  // Verificamos se a rifa está no estado "Em espera"
  if (!raffle || raffle.is_active !== 'Ativa') {
    throw new Error("A rifa não pode ser ativada porque não está no estado 'Ativa'.");
  }

  // Se estiver "Em espera", podemos prosseguir e ativá-la
  return await prisma.raffle.update({
    where: { id },
    data: { is_active: 'Em espera' },
  });
};

const deleteRaffle = async (id: number) => {
  const raffle = await prisma.raffle.findUnique({
    where: { id },
    include: {
      participants: true, // Inclui os participantes para contar quantos existem
    },
  });

  if (!raffle || raffle.participants.length !== 0) {
    throw new Error("A rifa não pode ser ativada porque não está no estado 'Em espera'.");
  }

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

async function createParticipantInSequence(
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

// Nova função para criar participantes com números específicos
async function createParticipantWithSpecificNumbers(
  userId: number,
  raffleId: number,
  selectedNumbers: number[],
  prismaInstance: PrismaClient = prisma,
) {
  const participantsData = [];

  // Verifica se os números selecionados estão disponíveis
  for (const number of selectedNumbers) {
    const participantExists = await prismaInstance.participant.findFirst({
      where: {
        raffle_id: raffleId,
        number: number,
      },
    });

    if (participantExists) {
      throw new Error(`Number ${number} is already taken in the raffle.`);
    }

    // Se o número estiver disponível, adiciona na lista de participantes a serem criados
    participantsData.push({
      user_id: userId,
      raffle_id: raffleId,
      number,
    });
  }

  // Cria os participantes com os números específicos
  return prismaInstance.participant.createMany({
    data: participantsData,
  });
}

// Função para verificar se um número já foi tomado por outro participante
async function isNumberTaken(raffleId: number, number: number) {
  const participantExists = await prisma.participant.findFirst({
    where: {
      raffle_id: raffleId,
      number: number,
    },
  });
  return !!participantExists; // Retorna verdadeiro se o número já foi tomado
}

async function findParticipantByRaffleAndUser(
  raffleId: number,
  number: number,
  transaction: PrismaClient = prisma, // Usar a instância de transação, se fornecida
) {
  return transaction.participant.findFirst({
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
      number: number,
      is_paid: true,
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

// Adicionar no raffleRepository

async function findHighestPaidParticipantByRaffleAndUser(raffleId: number, userId: number) {
  return prisma.participant.findFirst({
    where: {
      raffle_id: raffleId,
      user_id: userId,
      is_paid: true,
    },
    orderBy: {
      number: 'desc', // Ordena por número em ordem decrescente
    },
  });
}

async function findFirstAvailableNumberInRaffle(raffleId: number, totalNumbers: number) {
  const participants = await prisma.participant.findMany({
    where: {
      raffle_id: raffleId,
    },
    select: {
      number: true,
      is_paid: true,
      is_reserved: true,
    },
  });

  // Gera uma lista de todos os números de 1 até `totalNumbers`
  const allNumbers = Array.from({ length: totalNumbers }, (_, i) => i + 1);
  const usedNumbers = participants
    .filter(participant => participant.is_paid || participant.is_reserved)
    .map(participant => participant.number);

  // Encontra o primeiro número disponível
  return allNumbers.find(number => !usedNumbers.includes(number));
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

    // Criar os participantes
    const participantsData = Array.from({ length: quantity }, (_, i) => ({
      user_id: userId,
      raffle_id: raffleId,
      number: raffleData.participants.length + i + 1,
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

// Função para reservar números em sequência
async function reserveNumbersInSequence(
  userId: number,
  raffleId: number,
  quantity: number,
  reservedUntil: Date,
  prismaInstance: PrismaClient = prisma,
) {
  if (quantity <= 0) {
    throw new Error('Quantity must be greater than 0');
  }

  const existingParticipants = await prismaInstance.participant.findMany({
    where: {
      raffle_id: raffleId,
      is_reserved: false, // Somente números que não estão reservados
      is_paid: false, // E que ainda não foram pagos
    },
    orderBy: {
      number: 'asc',
    },
    select: {
      number: true,
    },
  });

  const availableNumbers = [];
  let currentNumber = 1;
  let existingIndex = 0;

  while (availableNumbers.length < quantity) {
    if (existingIndex >= existingParticipants.length || existingParticipants[existingIndex].number > currentNumber) {
      availableNumbers.push(currentNumber);
    } else {
      existingIndex++;
    }
    currentNumber++;
  }

  const participantsData = availableNumbers.map((number) => ({
    user_id: userId,
    raffle_id: raffleId,
    number,
    is_reserved: true,
    reserved_until: reservedUntil,
  }));

  return prismaInstance.participant.createMany({
    data: participantsData,
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

// Função para pagar um número reservado
export async function payForReservedNumber(
  userId: number,
  raffleId: number,
  numberToPay: number,
  transaction: PrismaClient = prisma,
): Promise<void> {
  console.log(userId, raffleId, numberToPay);
  await transaction.participant.updateMany({
    where: {
      raffle_id: raffleId,
      user_id: userId,
      number: numberToPay,
      is_reserved: true,
      is_paid: false,
    },
    data: {
      is_reserved: false,
      is_paid: true,
      reserved_until: null,
    },
  });
}

async function cancelReservations(userId: number, raffleId: number, numbersToCancel: number[]) {
  return prisma.participant.updateMany({
    where: {
      user_id: userId,
      raffle_id: raffleId,
      number: {
        in: numbersToCancel,
      },
      is_reserved: true,
    },
    data: {
      is_reserved: false,
      reserved_until: null,
    },
  });
}

// Função para reservar números específicos
async function reserveSpecificNumbers(
  userId: number,
  raffleId: number,
  selectedNumbers: number[],
  reservedUntil: Date,
) {
  const participantsData = [];

  for (const number of selectedNumbers) {
    const participantExists = await prisma.participant.findFirst({
      where: {
        raffle_id: raffleId,
        number: number,
        is_paid: false, // Não foi pago
        is_reserved: true, // Está reservado
      },
    });

    if (participantExists) {
      throw new Error(`Number ${number} is already taken or reserved.`);
    }

    participantsData.push({
      user_id: userId,
      raffle_id: raffleId,
      number,
      is_reserved: true,
      reserved_until: reservedUntil,
    });
  }

  return prisma.participant.createMany({
    data: participantsData,
  });
}

// Atualizar números reservados para pagos dentro de uma transação
export async function payForReservedNumbers(
  userId: number,
  raffleId: number,
  numbersToPay: number[],
  transaction: PrismaClient,
): Promise<void> {
  console.log(userId, raffleId, numbersToPay);
  await transaction.participant.updateMany({
    where: {
      raffle_id: raffleId,
      user_id: userId,
      number: { in: numbersToPay },
      is_reserved: true,
      is_paid: false,
    },
    data: {
      is_reserved: false,
      is_paid: true,
      reserved_until: null,
    },
  });
}

// Buscar números reservados pelo usuário (somente leitura, sem transação)
export async function findUserReservations(userId: number, raffleId: number): Promise<{ number: number }[]> {
  return prisma.participant.findMany({
    where: {
      user_id: userId,
      raffle_id: raffleId,
      is_reserved: true,
      is_paid: false,
    },
    select: {
      number: true,
    },
  });
}

// Cancelar números não pagos dentro de uma transação
export async function cancelUnpaidReservations(
  userId: number,
  raffleId: number,
  paidNumbers: number[],
  transaction: PrismaClient = prisma,
): Promise<void> {
  await transaction.participant.updateMany({
    where: {
      raffle_id: raffleId,
      user_id: userId,
      number: { notIn: paidNumbers },
      is_reserved: true,
    },
    data: {
      is_reserved: false,
      reserved_until: null,
    },
  });
}
async function updateReservationTime(userId: number, raffleId: number, number: number, newTime: Date) {
  return prisma.participant.updateMany({
    where: {
      user_id: userId,
      raffle_id: raffleId,
      number: number,
      is_reserved: true,
    },
    data: {
      reserved_until: newTime,
    },
  });
}

export default {
  findParticipantByRaffleAndUser,
  addParticipantToRaffle,
  removeParticipantFromRaffle,
  cancelUnpaidReservations,
  createRaffle,
  updateReservationTime,
  createParticipantInSequence,
  purchaseRaffleNumbers,
  createParticipantWithSpecificNumbers,
  getActiveRafflesWithDetails,
  postActiveRaffles,
  payForReservedNumber,
  getAllRafflesWithDetails,
  calculateTotalCost,
  reserveNumbersInSequence,
  isNumberTaken,
  clearExpiredReservations,
  reserveSpecificNumbers,
  deleteRaffle,
  findById,
  cancelReservations,
  findUserReservations,
  payForReservedNumbers,
  getActiveRafflesWithDetailsForRoulette,
  findHighestPaidParticipantByRaffleAndUser,
  findFirstAvailableNumberInRaffle,
  postDisableRaffles
};
