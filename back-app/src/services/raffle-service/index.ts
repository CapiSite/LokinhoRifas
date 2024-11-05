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

    // Buscar reservas anteriores do usuário
    const existingReservations = await raffleRepository.findUserReservations(userId, id);
    const existingNumbers = existingReservations.map((res) => res.number);

    // Se o array de 'selections' vier vazio, cancelar todas as reservas anteriores
    if (!selections || selections.length === 0) {
      if (existingReservations.length > 0) {
        const numbersToCancel = existingReservations.map((res) => res.number);

        // Cancela todas as reservas anteriores
        await raffleRepository.cancelReservations(userId, id, numbersToCancel);
      }

      // Reservar números em sequência
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
    } else {
      // Filtrar os números da nova seleção que já estão reservados pelo usuário
      const numbersToReserve = selections.filter((number) => !existingNumbers.includes(number));

      // Cancelar números que não estão mais na nova seleção
      const numbersToCancel = existingReservations
        .filter((res) => !selections.includes(res.number))
        .map((res) => res.number);

      if (numbersToCancel.length > 0) {
        await raffleRepository.cancelReservations(userId, id, numbersToCancel);
      }

      try {
        if (numbersToReserve.length > 0) {
          await raffleRepository.reserveSpecificNumbers(userId, id, numbersToReserve, reservationTime);
          reservedQuantity = numbersToReserve.length;
        }

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
  if (!user) throw new Error('User not found');
  let remainingBalance = user.saldo;

  for (const raffle of raffleArray) {
    const { id, selections } = raffle;
    let paidQuantity = 0;

    const raffleData = await raffleRepository.findById(id, null, { includeParticipants: true });
    if (!raffleData) {
      results.push({ id, success: false, paidQuantity: 0, message: `Raffle with ID ${id} not found` });
      continue;
    }

    const costPerNumber = raffleData.value / raffleData.users_quantity;

    if (remainingBalance < costPerNumber * selections.length) {
      results.push({ id, success: false, paidQuantity, message: 'Insufficient balance' });
      continue;
    }

    // Verifique se os números selecionados já foram reservados e pagos por outro usuário ou outra transação
    const existingPaidSelections = await prisma.participant.findMany({
      where: {
        raffle_id: id,
        number: { in: selections },
        is_paid: true,
      },
      select: { number: true },
    });

    const alreadyPaidNumbers = new Set(existingPaidSelections.map((p) => p.number));
    const numbersToPay = selections.filter((number) => !alreadyPaidNumbers.has(number));

    if (numbersToPay.length === 0) {
      results.push({ id, success: false, paidQuantity, message: 'All selected numbers are already paid.' });
      continue;
    }

    const transactionPromises = numbersToPay.map((selectedNumber) => {
      return prisma.participant.updateMany({
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
    });

    transactionPromises.push(
      prisma.user.updateMany({
        where: { id: userId },
        data: {
          saldo: {
            decrement: costPerNumber * numbersToPay.length,
          },
        },
      }),
    );

    try {
      await prisma.$transaction(transactionPromises);

      remainingBalance -= costPerNumber * numbersToPay.length;
      paidQuantity = numbersToPay.length;

      // Cria a transação após o pagamento
      const transactionData = {
        user: { connect: { id: userId } }, // Conecta o usuário pelo ID
        raffle: { connect: { id } },       // Conecta a rifa pelo ID
        paymentId: `Raffle-${id}-${new Date().getTime()}`, // Gera um ID único para a transação
        status: 'completed',
        paymentMethod: 'balance', // Pode ser ajustado para refletir o método de pagamento real
        transactionAmount: costPerNumber * numbersToPay.length,
        type: 'debit', // Marca a transação como débito
        dateApproved: new Date(),
      };

      await transactionRepository.createTransaction(transactionData);

      results.push({
        id,
        success: true,
        paidQuantity,
        message: `${paidQuantity} numbers paid successfully`,
      });
    } catch (error) {
      results.push({
        id,
        success: false,
        paidQuantity,
        message: `Transaction failed: ${error.message}`,
      });
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
  getRafflesForRoulette,
};
