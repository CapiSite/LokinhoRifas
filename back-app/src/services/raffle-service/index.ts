import raffleRepository from "../../repositories/raffle-repository";
import skinRepository from "../../repositories/skin-repository";
import transactionRepository from "../../repositories/transaction-repository";
import userRepository from "../../repositories/user-repository";
import { Raffle } from '@prisma/client';
import { subMinutes, isAfter } from 'date-fns'; // Você pode usar esta lib para manipular datas

interface CreateRaffleParams {
  name: string;
  users_quantity: number;
  free:boolean;
  skins: { id: number }[];
  userId: number; // Adicionado userId
}


async function reserveRaffleNumber(userId: number, raffleId: number, number: number) {
  console.log(number)
  // Verifica se o número já foi comprado ou está reservado
  const participant = await raffleRepository.findParticipantByRaffleAndNumber(raffleId, number);
  console.log(participant.number)
  console.log(participant.is_reserved)
  if (participant) {
    if (participant.is_reserved) {
      // Checa se a reserva expirou
      if (isAfter(new Date(), participant.reserved_until)) {
        // Se expirou, liberar o número para reserva novamente
        await raffleRepository.updateParticipantReservation(participant.id, false, null, false);
      } else {
        throw new Error('Número já reservado.');
      }
    } else {
      throw new Error('Número já comprado.');
    }
  }

  // Reservar o número por 10 minutos
  const reservedUntil = new Date();
  reservedUntil.setMinutes(reservedUntil.getMinutes() + 10);
  console.log(reservedUntil)

  // Cria ou atualiza o participante com o status de reserva
  await raffleRepository.createOrUpdateParticipant({
    user_id: userId,
    raffle_id: raffleId,
    number,
    is_reserved: true,
    reserved_until: reservedUntil,
  });
  
  return { message: 'Número reservado com sucesso.' };
}

export async function createRaffle(params: CreateRaffleParams): Promise<Raffle> {
  const skins = await skinRepository.getSkinsByIds(params.skins.map((s) => s.id));

  const repeatedSkins = params.skins.map((skin) => {
    const skinData = skins.find((s) => s.id === skin.id);
    return {
      skin_id: skinData.id,
      skinName: skinData.name,
      skinValue: skinData.value,
      skinType: skinData.type,
      skinPicture: skinData.picture,
    };
  });

  // Calcule o valor total da rifa
  const raffleValue = repeatedSkins.reduce((acc: number, skin) => acc + skin.skinValue, 0);

  return raffleRepository.createRaffle({
    name: params.name,
    users_quantity: params.users_quantity,
    free: params.free,
    value: raffleValue,
    raffleSkins: repeatedSkins, // Use a lista de skins repetidas
  });
}

async function getRaffles() {
  const raffles = await raffleRepository.getActiveRafflesWithDetails();
  return raffles;
}

async function getAllRaffles(page: number) {
  const raffles = await raffleRepository.getAllRafflesWithDetails(page);
  return raffles;
}

async function activeRaffles(id: number) {
  const raffles = await raffleRepository.postActiveRaffles(id);
  return raffles;
}

async function deleteRaffle(id: number) {
  return await raffleRepository.deleteRaffle(id);
}

async function buyRaffleService(userId: number, raffleArray: Array<{ id: number; numbers: number[] }>) {
  const results: Array<{ id: number; success: boolean; purchasedNumbers: number[]; message: string }> = [];
  const user = await userRepository.findById(userId);
  if (!user) throw new Error('User not found');

  let remainingBalance = user.saldo;

  for (const raffle of raffleArray) {
    const { id, numbers } = raffle;
    let totalSpent = 0;

    const raffleData = await raffleRepository.findById(id, null, { includeParticipants: true });
    if (!raffleData) {
      results.push({ id, success: false, purchasedNumbers: [], message: `Raffle with ID ${id} not found` });
      continue;
    }

    const costPerNumber = raffleData.value / raffleData.users_quantity;
    const totalCost = costPerNumber * numbers.length;

    if (remainingBalance < totalCost) {
      results.push({ id, success: false, purchasedNumbers: [], message: `Insufficient balance` });
      continue;
    }

    const purchasedNumbers = [];
    for (const number of numbers) {
      const participant = await raffleRepository.findParticipantByRaffleAndNumber(id, number);

      if (participant && participant.is_reserved && isAfter(new Date(), participant.reserved_until)) {
        // Limpa reserva se tiver expirado
        await raffleRepository.updateParticipantReservation(participant.id, false, null, true);
      }

      if (participant && !participant.is_reserved) {
        // Número já comprado
        results.push({ id, success: false, purchasedNumbers: [], message: `Number ${number} already purchased.` });
        continue;
      }

      if (!participant || participant.is_reserved) {
        // Compra o número reservado ou disponível
        remainingBalance -= costPerNumber;
        totalSpent += costPerNumber;

        await userRepository.decrementUserBalance(userId, costPerNumber);
        await raffleRepository.createParticipant(userId, id, number);

        purchasedNumbers.push(number);
      }
    }

    if (purchasedNumbers.length > 0) {
      await transactionRepository.createTransaction({
        user: { connect: { id: userId } },
        raffle: { connect: { id } },
        transactionAmount: totalSpent,
        type: 'debit',
        status: 'completed',
        paymentMethod: 'balance',
      });

      results.push({ id, success: true, purchasedNumbers, message: `${purchasedNumbers.length} raffle numbers purchased successfully` });
    }
  }

  return {
    results,
    remainingBalance,
  };
}

async function addParticipantToRaffle(raffleId: number, userId: number) {
  const raffleData = await raffleRepository.findById(raffleId, null, { includeParticipants: true });
  if (!raffleData) throw new Error(`Raffle with ID ${raffleId} not found`);

  const nextNumber = raffleData.participants.length + 1;

  const participant = await raffleRepository.addParticipantToRaffle(raffleId, userId, nextNumber);
  return participant;
}

async function removeParticipantFromRaffle(raffleId: number, number: number) {
  const participant = await raffleRepository.findParticipantByRaffleAndUser(raffleId, number);
  if (!participant) {
    throw new Error('Participante não encontrado na rifa');
  }
  await raffleRepository.removeParticipantFromRaffle(participant.id);
}

async function clearExpiredReservations() {
  const now = new Date();
  await raffleRepository.clearExpiredReservations(now);
}
async function cancelRaffleNumberReservation(raffleId: number, number: number) {
  // Encontre o participante associado a esse número e rifa
  const participant = await raffleRepository.findParticipantByRaffleAndUser(raffleId, number);

  // Verifique se o participante existe e se a reserva pertence ao usuário
  if (!participant || !participant.is_reserved) {
    throw new Error('Número não está reservado ou usuário não tem permissão.');
  }

  // Atualize o status do participante para remover a reserva
  return raffleRepository.updateParticipantReservation(participant.id, false, null, false);
}
export default {
  addParticipantToRaffle,
  cancelRaffleNumberReservation,
  clearExpiredReservations,
  removeParticipantFromRaffle,
  createRaffle,
  reserveRaffleNumber,
  getRaffles,
  activeRaffles,
  getAllRaffles,
  deleteRaffle,
  buyRaffleService,
};
