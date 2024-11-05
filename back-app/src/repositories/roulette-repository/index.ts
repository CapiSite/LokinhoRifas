import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function getActiveRaffleParticipants() {
  // Primeiro, encontramos a rifa ativa com o menor ID
  const lowestActiveRaffle = await prisma.raffle.findFirst({
    where: {
      is_active: "Ativa"
    },
    orderBy: {
      id: 'asc' // Ordena por ID em ordem ascendente
    }
  });

  // Verifica se há uma rifa ativa
  if (lowestActiveRaffle) {
    // Busca os participantes dessa rifa específica
    const participants = await prisma.participant.findMany({
      where: {
        raffle_id: lowestActiveRaffle.id // Usamos o ID da rifa encontrada
      },
      include: {
        user: true, // Incluímos detalhes do usuário
        raffle: true // Incluímos detalhes da rifa
      }
    });

    // Tratamos os dados para retornar apenas o necessário
    return participants.map(participant => ({
      id: participant.user.id,
      name: participant.user.name,
      number: participant.number,
      picture: participant.user.picture
    }));
  } else {
    // Retorna uma mensagem específica se não houver rifas ativas
    return ["Sem Rifa Ativa no momento!"];
  }
}

async function getParticipantsByRaffleId(id: number, page: number, pageSize: number = 20) {
  const participants = await prisma.participant.findMany({
      where: {
          raffle_id: id,
          is_paid: true
      },
      include: {
          user: true,
          raffle: true
      }
  });

  return participants.map(participant => ({
      id: participant.user.id,
      name: participant.user.name,
      number: participant.number,
      picture: participant.user.picture,
      tradeLink: participant.user.tradeLink,
      email: participant.user.email
  }));
}

async function getParticipantsByRaffleName(id:number, name: string, page: number, pageSize: number = 20) {
  const participants = await prisma.participant.findMany({
    where: {
        raffle_id:id,
        user: {
            name: {
                contains: name,
                mode: 'insensitive' // Ignora maiúsculas e minúsculas
            }
        }
    },
    include: {
        user: true,
        raffle: true
    },
    skip: (page - 1) * pageSize, // Pular registros baseados na página atual
    take: pageSize              // Quantidade de registros a serem retornados
});

  return participants.map(participant => ({
      id: participant.user.id,
      name: participant.user.name,
      number: participant.number,
      picture: participant.user.picture,
      tradeLink: participant.user.tradeLink,
      email: participant.user.email
  }));
}

export default {
  getActiveRaffleParticipants,
  getParticipantsByRaffleId,
  getParticipantsByRaffleName
};
