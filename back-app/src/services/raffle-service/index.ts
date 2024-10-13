import raffleRepository from "../../repositories/raffle-repository";
import skinRepository from "../../repositories/skin-repository";
import transactionRepository from "../../repositories/transaction-repository";
import userRepository from "../../repositories/user-repository";
import { Raffle } from '@prisma/client';

interface CreateRaffleParams {
  name: string;
  users_quantity: number;
  free:boolean;
  skins: { id: number }[];
  userId: number; // Adicionado userId
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

async function buyRaffleInSequenceOrSpecific(
  userId: number,
  raffleArray: Array<{ id: number; quantity: number; selections?: number[] }>
) {
  const results: Array<{ id: number; success: boolean; purchasedQuantity: number; message: string }> = [];
  const user = await userRepository.findById(userId);
  if (!user) throw new Error('User not found');

  let remainingBalance = user.saldo;

  for (const raffle of raffleArray) {
    const { id, quantity, selections } = raffle;

    let purchasedQuantity = 0;
    let totalSpent = 0;

    const raffleData = await raffleRepository.findById(id, null, { includeParticipants: true });
    if (!raffleData) {
      results.push({ id, success: false, purchasedQuantity: 0, message: `Raffle with ID ${id} not found` });
      continue;
    }

    const availableNumbers = raffleData.users_quantity - raffleData.participants.length;
    if (availableNumbers < quantity) {
      results.push({ id, success: false, purchasedQuantity: 0, message: `Not enough available raffle numbers` });
      continue;
    }

    const costPerNumber = raffleData.value / raffleData.users_quantity;
    const totalCost = costPerNumber * quantity;

    if (remainingBalance < totalCost) {
      results.push({ id, success: false, purchasedQuantity: 0, message: `Insufficient balance` });
      continue;
    }

    if (selections && selections.length > 0) {
      // Caso o usuário tenha selecionado números específicos
      try {
        await raffleRepository.createParticipantWithSpecificNumbers(userId, id, selections);

        // Atualiza o saldo do usuário
        remainingBalance -= totalCost;
        totalSpent += totalCost;

        await userRepository.decrementUserBalance(userId, totalCost);

        purchasedQuantity = selections.length;
        results.push({
          id,
          success: true,
          purchasedQuantity,
          message: `${purchasedQuantity} specific raffle numbers purchased successfully`,
        });
      } catch (error) {
        results.push({
          id,
          success: false,
          purchasedQuantity,
          message: `Failed to purchase specific raffle numbers: ${error.message}`,
        });
        continue;
      }
    } else {
      // Caso o usuário não tenha selecionado números (compra em sequência)
      try {
        await raffleRepository.createParticipantInSequence(userId, id, quantity);

        // Atualiza o saldo do usuário
        remainingBalance -= totalCost;
        totalSpent += totalCost;

        await userRepository.decrementUserBalance(userId, totalCost);

        purchasedQuantity = quantity;
        results.push({
          id,
          success: true,
          purchasedQuantity,
          message: `${purchasedQuantity} raffle numbers purchased in sequence`,
        });
      } catch (error) {
        results.push({
          id,
          success: false,
          purchasedQuantity,
          message: `Failed to purchase raffle numbers in sequence: ${error.message}`,
        });
        continue;
      }
    }

    // Registra a transação para todos os números comprados
    if (purchasedQuantity > 0) {
      try {
        await transactionRepository.createTransaction({
          user: { connect: { id: userId } },
          raffle: { connect: { id } },
          transactionAmount: totalSpent,
          type: 'debit',
          status: 'completed',
          paymentMethod: 'balance',
        });
      } catch (error) {
        results.push({
          id,
          success: false,
          purchasedQuantity,
          message: `Transaction error after purchasing ${purchasedQuantity} numbers: ${error.message}`,
        });
      }
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

export default {
  clearExpiredReservations,
  addParticipantToRaffle,
  removeParticipantFromRaffle,
  createRaffle,
  getRaffles,
  activeRaffles,
  getAllRaffles,
  deleteRaffle,
  buyRaffleInSequenceOrSpecific,
};