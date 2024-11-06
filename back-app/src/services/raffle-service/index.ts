import raffleRepository from '../../repositories/raffle-repository';
import skinRepository from '../../repositories/skin-repository';
import transactionRepository from '../../repositories/transaction-repository';
import userRepository from '../../repositories/user-repository';
import { Raffle } from '@prisma/client';
import { prisma } from '../../config';

interface CreateRaffleParams {
  name: string;
  users_quantity: number;
  free: boolean;
  skins: { id: number; position: number }[];
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
      position: skin.position
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
async function getRafflesForRoulette() {
  const raffles = await raffleRepository.getActiveRafflesWithDetailsForRoulette();
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

async function reserveRaffleNumbers(
  userId: number,
  raffleArray: Array<{ id: number; quantity: number; selections?: number[] }>,
) {
  const results: Array<{ id: number; success: boolean; reservedQuantity: number; message: string }> = [];
  console.log('Starting reservation process for user:', userId);

  const user = await userRepository.findById(userId);
  if (!user) {
    console.log('User not found:', userId);
    throw new Error('User not found');
  }
  console.log('User found:', user);

  const reservationTime = new Date();
  reservationTime.setMinutes(reservationTime.getMinutes() + 10); // Reservar por 10 minutos

  for (const raffle of raffleArray) {
    const { id, quantity, selections } = raffle;
    let reservedQuantity = 0;
    console.log(`Processing raffle ID: ${id}, quantity: ${quantity}, selections: ${selections}`);

    const raffleData = await raffleRepository.findById(id, null, { includeParticipants: true });
    if (!raffleData) {
      console.log(`Raffle with ID ${id} not found`);
      results.push({ id, success: false, reservedQuantity: 0, message: `Raffle with ID ${id} not found` });
      continue;
    }
    console.log('Raffle data found:', raffleData);

    // Ajustar a lógica para calcular apenas números disponíveis para reserva
    const availableNumbersCount = raffleData.participants.filter(
      (participant) => !participant.is_paid && !participant.is_reserved
    ).length;
    console.log(`Available numbers for raffle ID ${id}: ${availableNumbersCount}`);

    if (availableNumbersCount < quantity) {
      console.log(`Not enough available numbers for raffle ID ${id}`);
      results.push({ id, success: false, reservedQuantity: 0, message: `Not enough available raffle numbers` });
      continue;
    }

    console.log('Fetching existing reservations for user:', userId);
    const existingReservations = await raffleRepository.findUserReservations(userId, id);
    console.log('Existing reservations found:', existingReservations);

    const existingNumbers = existingReservations.map((res) => res.number);
    console.log('Existing reserved numbers:', existingNumbers);

    if (!selections || selections.length === 0) {
      console.log('No specific selections provided, canceling existing reservations');
      if (existingReservations.length > 0) {
        const numbersToCancel = existingReservations.map((res) => res.number);
        console.log('Numbers to cancel:', numbersToCancel);

        await raffleRepository.cancelReservations(userId, id, numbersToCancel);
      }

      try {
        console.log(`Reserving ${quantity} numbers in sequence for raffle ID ${id}`);
        await raffleRepository.reserveNumbersInSequence(userId, id, quantity, reservationTime);
        reservedQuantity = quantity;
        console.log(`Reserved ${reservedQuantity} numbers in sequence for raffle ID ${id}`);

        results.push({
          id,
          success: true,
          reservedQuantity,
          message: `${reservedQuantity} raffle numbers reserved in sequence`,
        });
      } catch (error) {
        console.log('Error reserving numbers in sequence:', error.message);
        results.push({
          id,
          success: false,
          reservedQuantity,
          message: `Failed to reserve raffle numbers in sequence: ${error.message}`,
        });
        continue;
      }
    } else {
      console.log('Selections provided, filtering numbers to reserve');
      const numbersToReserve = selections.filter((number) => !existingNumbers.includes(number));
      console.log('Numbers to reserve:', numbersToReserve);

      const numbersToCancel = existingReservations
        .filter((res) => !selections.includes(res.number))
        .map((res) => res.number);
      console.log('Numbers to cancel:', numbersToCancel);

      if (numbersToCancel.length > 0) {
        console.log('Canceling numbers not in the new selection');
        await raffleRepository.cancelReservations(userId, id, numbersToCancel);
      }

      try {
        if (numbersToReserve.length > 0) {
          console.log(`Reserving specific numbers for raffle ID ${id}:`, numbersToReserve);
          await raffleRepository.reserveSpecificNumbers(userId, id, numbersToReserve, reservationTime);
          reservedQuantity = numbersToReserve.length;
          console.log(`Reserved ${reservedQuantity} specific numbers for raffle ID ${id}`);
        }

        results.push({
          id,
          success: true,
          reservedQuantity,
          message: `${reservedQuantity} specific raffle numbers reserved successfully`,
        });
      } catch (error) {
        console.log('Error reserving specific numbers:', error.message);
        results.push({
          id,
          success: false,
          reservedQuantity,
          message: `Failed to reserve specific raffle numbers: ${error.message}`,
        });
        continue;
      }
    }
  }

  console.log('Final reservation results:', results);
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
export interface PayReservedRaffleNumbersResult {
  id: number; // ID da rifa
  success: boolean; // Indica se o pagamento foi bem-sucedido
  paidQuantity: number; // Quantidade de números pagos
  message: string; // Mensagem informativa sobre o pagamento
}
// Representa um item de rifa no array de compra
export interface RaffleArrayItem {
  id: number; // ID da rifa
  selections?: number[]; // Números selecionados pelo usuário (opcional)
}
interface RaffleTransactionData {
  userId: number;
  raffleId: number;
  paymentId: string;
  status: string;
  paymentMethod: string;
  transactionAmount: number;
  type: 'debit';
  dateApproved: Date;
}

export async function payReservedRaffleNumbers(
  userId: number,
  raffleArray: RaffleArrayItem[],
): Promise<PayReservedRaffleNumbersResult[]> {
  const results: PayReservedRaffleNumbersResult[] = [];
  const user = await userRepository.findById(userId);
  if (!user) {
    console.log('User not found');
    throw new Error('User not found');
  }
  let remainingBalance = user.saldo;
  console.log('User found:', user);

  for (const raffle of raffleArray) {
    const { id, selections } = raffle;
    let paidQuantity = 0;
    console.log(`Processing raffle ID: ${id}, selections: ${selections}`);

    const raffleData = await raffleRepository.findById(id, null, { includeParticipants: true });
    if (!raffleData) {
      console.log(`Raffle with ID ${id} not found`);
      results.push({ id, success: false, paidQuantity: 0, message: `Raffle with ID ${id} not found` });
      continue;
    }
    console.log('Raffle data found:', raffleData);

    const costPerNumber = raffleData.value / raffleData.users_quantity;
    console.log(`Cost per number: ${costPerNumber}, User balance: ${remainingBalance}`);

    if (remainingBalance < costPerNumber * selections.length) {
      console.log('Insufficient balance');
      results.push({ id, success: false, paidQuantity, message: 'Insufficient balance' });
      continue;
    }

    const existingPaidSelections = await prisma.participant.findMany({
      where: {
        raffle_id: id,
        number: { in: selections },
        is_paid: true,
      },
      select: { number: true },
    });
    console.log('Existing paid selections:', existingPaidSelections);

    const alreadyPaidNumbers = new Set(existingPaidSelections.map((p) => p.number));
    const numbersToPay = selections.filter((number) => !alreadyPaidNumbers.has(number));
    console.log('Numbers to pay:', numbersToPay);

    if (numbersToPay.length === 0) {
      console.log('All selected numbers are already paid.');
      results.push({ id, success: false, paidQuantity, message: 'All selected numbers are already paid.' });
      continue;
    }

    const numbersAlreadyExist = await prisma.participant.findMany({
      where: {
        raffle_id: id,
        number: { in: numbersToPay },
        OR: [
          { is_paid: false, is_reserved: false },
          { is_reserved: true, user_id: userId },
        ],
      },
      select: { number: true },
    });
    console.log('Numbers already exist or reserved by user:', numbersAlreadyExist);

    const existingNumbersSet = new Set(numbersAlreadyExist.map((p) => p.number));
    const validNumbersToPay = numbersToPay.filter((number) => existingNumbersSet.has(number));
    console.log('Valid numbers to pay:', validNumbersToPay);

    if (validNumbersToPay.length !== numbersToPay.length) {
      console.log('Some selected numbers are not available.');
      results.push({ id, success: false, paidQuantity, message: 'Some selected numbers are not available.' });
      continue;
    }

    // Atualiza os números fora da transação
    try {
      for (const selectedNumber of validNumbersToPay) {
        console.log(`Updating participant number ${selectedNumber}`);
        await prisma.participant.updateMany({
          where: {
            raffle_id: id,
            user_id: userId,
            number: selectedNumber,
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

      // Separar a lógica de desconto de saldo e criação de transação
      console.log('Starting balance decrement and transaction creation');
      try {
        await prisma.user.update({
          where: { id: userId },
          data: {
            saldo: {
              decrement: costPerNumber * validNumbersToPay.length,
            },
          },
        });

        await prisma.transaction.create({
          data: {
            user: { connect: { id: userId } },
            raffle: { connect: { id } },
            paymentId: `Raffle-${id}-${new Date().getTime()}`,
            status: 'completed',
            paymentMethod: 'balance',
            transactionAmount: costPerNumber * validNumbersToPay.length,
            type: 'debit',
            dateApproved: new Date(),
          },
        });
        console.log('Transaction created successfully');

        paidQuantity = validNumbersToPay.length;
        remainingBalance -= costPerNumber * validNumbersToPay.length;

        results.push({
          id,
          success: true,
          paidQuantity,
          message: `${paidQuantity} numbers paid successfully`,
        });
      } catch (error) {
        console.log('Transaction creation or balance update failed:', error.message);

        // Reverter os números para o estado anterior em caso de falha no débito ou transação
        for (const selectedNumber of validNumbersToPay) {
          console.log(`Reverting participant number ${selectedNumber}`);
          await prisma.participant.updateMany({
            where: {
              raffle_id: id,
              user_id: userId,
              number: selectedNumber,
              is_paid: true,
            },
            data: {
              is_paid: false,
              is_reserved: true,
              reserved_until: new Date(new Date().getTime() + 10 * 60 * 1000), // Re-reservar por 10 minutos
            },
          });
        }

        results.push({
          id,
          success: false,
          paidQuantity: 0,
          message: `Transaction creation failed: ${error.message}`,
        });
      }
    } catch (error) {
      console.log('Updating participants failed:', error.message);
      results.push({
        id,
        success: false,
        paidQuantity: 0,
        message: `Failed to update participant numbers: ${error.message}`,
      });
    }
  }

  console.log('Final results:', results);
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
  getRafflesForRoulette,
};
