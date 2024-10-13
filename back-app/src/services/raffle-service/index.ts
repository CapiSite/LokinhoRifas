import raffleRepository from '../../repositories/raffle-repository';
import skinRepository from '../../repositories/skin-repository';
import transactionRepository from '../../repositories/transaction-repository';
import userRepository from '../../repositories/user-repository';
import { Raffle } from '@prisma/client';

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

async function buyRaffleService(userId: number, raffleArray: Array<{ id: number; quantity: number }>) {
  const results: Array<{ id: number; success: boolean; purchasedQuantity: number; message: string }> = [];
  console.log(userId, raffleArray);
  const user = await userRepository.findById(userId);
  if (!user) throw new Error('User not found');

  let remainingBalance = user.saldo;

  for (const raffle of raffleArray) {
    const { id, quantity } = raffle;

    let purchasedQuantity = 0;
    let totalSpent = 0;

    // Verificação da rifa e saldo do usuário
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

    for (let i = 0; i < quantity; i++) {
      try {
        // Atualiza o saldo do usuário
        remainingBalance -= costPerNumber;
        totalSpent += costPerNumber;

        await userRepository.decrementUserBalance(userId, costPerNumber);

        // Cria o participante para a rifa
        await raffleRepository.createParticipant(userId, id, 1);

        purchasedQuantity += 1;
        results.push({ id, success: true, purchasedQuantity, message: `1 raffle number purchased successfully` });
      } catch (error) {
        results.push({
          id,
          success: false,
          purchasedQuantity,
          message: `Failed to purchase raffle number: ${error.message}`,
        });
        break; // Para de tentar comprar se falhar
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

export default {
  addParticipantToRaffle,
  removeParticipantFromRaffle,
  createRaffle,
  getRaffles,
  activeRaffles,
  getAllRaffles,
  deleteRaffle,
  buyRaffleService,
};
