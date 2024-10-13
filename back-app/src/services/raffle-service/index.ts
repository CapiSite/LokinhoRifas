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

async function reserveRaffleNumbers(
  userId: number,
  raffleArray: Array<{ id: number; quantity: number; selections?: number[] }>
) {
  const results: Array<{ id: number; success: boolean; reservedQuantity: number; message: string }> = [];
  const user = await userRepository.findById(userId);
  if (!user) throw new Error('User not found');

  const reservationTime = new Date();
  reservationTime.setMinutes(reservationTime.getMinutes() + 10); // Reservar por 10 minutos

  for (const raffle of raffleArray) {
    const { id, quantity, selections } = raffle;

    let reservedQuantity = 0;

    const raffleData = await raffleRepository.findById(id, null, { includeParticipants: true });
    if (!raffleData) {
      results.push({ id, success: false, reservedQuantity: 0, message: `Raffle with ID ${id} not found` });
      continue;
    }

    const availableNumbers = raffleData.users_quantity - raffleData.participants.length;
    if (availableNumbers < quantity) {
      results.push({ id, success: false, reservedQuantity: 0, message: `Not enough available raffle numbers` });
      continue;
    }

    if (selections && selections.length > 0) {
      // Caso o usuário tenha selecionado números específicos
      try {
        await raffleRepository.reserveSpecificNumbers(userId, id, selections, reservationTime);
        reservedQuantity = selections.length;
        results.push({
          id,
          success: true,
          reservedQuantity,
          message: `${reservedQuantity} specific raffle numbers reserved successfully`,
        });
      } catch (error) {
        results.push({
          id,
          success: false,
          reservedQuantity,
          message: `Failed to reserve specific raffle numbers: ${error.message}`,
        });
        continue;
      }
    } else {
      // Caso o usuário não tenha selecionado números (reserva em sequência)
      try {
        await raffleRepository.reserveNumbersInSequence(userId, id, quantity, reservationTime);
        reservedQuantity = quantity;
        results.push({
          id,
          success: true,
          reservedQuantity,
          message: `${reservedQuantity} raffle numbers reserved in sequence`,
        });
      } catch (error) {
        results.push({
          id,
          success: false,
          reservedQuantity,
          message: `Failed to reserve raffle numbers in sequence: ${error.message}`,
        });
        continue;
      }
    }
  }

  return results;
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

/*************  ✨ Codeium Command ⭐  *************/
/**
 * Pay for reserved raffle numbers
 * @param {number} userId - ID of the user who reserved the raffle numbers
 * @param {Array<{ id: number; selections?: number[] }>} raffleArray - Array of objects with the raffle ID and optional array of selected numbers
 * @returns {Promise<Array<{ id: number; success: boolean; paidQuantity: number; message: string }>>} - Array of objects with the raffle ID, success status, paid quantity, and message
 */
/******  a1246304-d96f-4853-9947-d333e08b8d53  *******/
async function payReservedRaffleNumbers(
  userId: number,
  raffleArray: Array<{ id: number; selections?: number[] }>
) {
  const results: Array<{ id: number; success: boolean; paidQuantity: number; message: string }> = [];
  const user = await userRepository.findById(userId);
  if (!user) throw new Error('User not found');

  let remainingBalance = user.saldo;

  for (const raffle of raffleArray) {
    const { id, selections } = raffle;

    let paidQuantity = 0;
    let totalSpent = 0;

    const raffleData = await raffleRepository.findById(id, null, { includeParticipants: true });
    if (!raffleData) {
      results.push({ id, success: false, paidQuantity: 0, message: `Raffle with ID ${id} not found` });
      continue;
    }

    const costPerNumber = raffleData.value / raffleData.users_quantity;

    if (selections && selections.length > 0) {
      // Pagar os números especificados
      for (const selectedNumber of selections) {
        const participant = await raffleRepository.findParticipantByRaffleAndUser(id, selectedNumber);

        if (!participant || !participant.is_reserved) {
          results.push({
            id,
            success: false,
            paidQuantity,
            message: `Number ${selectedNumber} is not reserved or already paid`,
          });
          continue;
        }

        if (remainingBalance < costPerNumber) {
          results.push({ id, success: false, paidQuantity, message: `Insufficient balance for number ${selectedNumber}` });
          break;
        }

        try {
          // Atualiza o saldo do usuário
          remainingBalance -= costPerNumber;
          totalSpent += costPerNumber;

          await userRepository.decrementUserBalance(userId, costPerNumber);

          // Marca o número como pago
          await raffleRepository.payForReservedNumber(userId, id, selectedNumber);

          paidQuantity += 1;
          results.push({
            id,
            success: true,
            paidQuantity,
            message: `Number ${selectedNumber} paid successfully`,
          });
        } catch (error) {
          results.push({
            id,
            success: false,
            paidQuantity,
            message: `Failed to pay for number ${selectedNumber}: ${error.message}`,
          });
          break;
        }
      }

      // Cancelar reservas não pagas
      await raffleRepository.cancelUnpaidReservations(userId, id, selections);
    }
  }

  return results;
}


export default {
  clearExpiredReservations,
  addParticipantToRaffle,
  removeParticipantFromRaffle,
  createRaffle,
  getRaffles,
  reserveRaffleNumbers,
  activeRaffles,
  getAllRaffles,
  payReservedRaffleNumbers,
  deleteRaffle,
  buyRaffleInSequenceOrSpecific,
};