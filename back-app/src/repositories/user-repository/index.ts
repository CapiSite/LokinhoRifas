import { Prisma, PrismaClient, User } from '@prisma/client';
import { prisma } from '../../config';

async function findByEmail(email: string, select?: Prisma.UserSelect) {
  const params: Prisma.UserFindUniqueArgs = {
    where: {
      email,
    },
  };

  if (select) {
    params.select = select;
  }

  return await prisma.user.findUnique(params);
}

async function findByName(name: string, select?: Prisma.UserSelect) {
  const params: Prisma.UserFindUniqueArgs = {
    where: {
      name,
    },
  };

  if (select) {
    params.select = select;
  }

  return await prisma.user.findUnique(params);
}

async function findById(id: number) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return user;
}

async function findParticipantById(id: number) {
  try {
    const winner = await prisma.participant.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        raffleSkins: true,
      },
    });

    if (winner) {
      // Removendo informações sensíveis antes de retornar
      delete winner.user.twitchId;
      delete winner.user.updatedAt;
      delete winner.user.password;
      delete winner.user.createdAt;
    }

    return winner;
  } catch (error) {
    throw new Error('User not Found');
  }
}

async function create(data: Prisma.UserUncheckedCreateInput) {
  return prisma.user.create({
    data,
  });
}
async function postWinners(params: { participantId: number; raffleId: number }) {
  try {
    // Encontra a rifa pelo ID, incluindo os raffleSkins associados
    const raffle = await prisma.raffle.findUnique({
      where: {
        id: params.raffleId,
      },
      include: {
        raffleSkins: true,
      },
    });

    if (!raffle) {
      throw new Error('Raffle not found');
    }

    if (raffle.is_active !== 'Ativa') {
      throw new Error('Raffle not active');
    }

    // Verifica se o participante já é vencedor de algum raffleSkin nesta rifa
    const existingWinner = await prisma.raffleSkin.findFirst({
      where: {
        raffle_id: params.raffleId,
        winner: {
          id: params.participantId,
        },
      },
    });

    if (existingWinner) {
      throw new Error('This participant has already won a skin in this raffle.');
    }

    // Encontra o raffleSkin com o menor ID que ainda não tem um vencedor
    const raffleSkinToAssign = raffle.raffleSkins
      .filter((skin) => skin.winner_id === null) // Considera apenas os skins que ainda não têm ganhador
      .sort((a, b) => a.id - b.id)[0]; // Ordena por ID e pega o primeiro

    if (!raffleSkinToAssign) {
      throw new Error('No available skins to assign a winner');
    }

    // Atualiza o raffleSkin para associar o vencedor usando o participantId
    const updatedRaffleSkin = await prisma.raffleSkin.update({
      where: {
        id: raffleSkinToAssign.id,
      },
      data: {
        winner: {
          connect: { id: params.participantId },
        },
      },
    });

    // Verifica se todos os raffleSkins já têm vencedores
    const remainingSkins = await prisma.raffleSkin.count({
      where: {
        raffle_id: params.raffleId,
        winner_id: null,
      },
    });

    // Se não restar mais skins sem ganhadores, a rifa é marcada como inativa
    if (remainingSkins === 0) {
      await prisma.raffle.update({
        where: {
          id: params.raffleId,
        },
        data: {
          is_active: 'Inativa',
        },
      });
    }

    return updatedRaffleSkin;
  } catch (error) {
    throw error;
  }
}

async function createByTwitch(data: Prisma.UserUncheckedCreateInput) {
  return prisma.user.create({
    data,
  });
}

export async function updatedByTwitch(userId: number, twitchId: string) {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        twitchId: twitchId,
      },
    });
    return updatedUser;
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    throw error;
  }
}

export async function getLastWinners(page: number, itemsPerPage: number) {
  try {
    const lastRaffles = await prisma.raffle.findMany({
      take: itemsPerPage,
      skip: (page - 1) * itemsPerPage,
      where: {
        raffleSkins: {
          some: {
            winner_id: { not: null },
          },
        },
      },
      include: {
        raffleSkins: {
          include: {
            winner: {
              include: {
                user: true,
              },
            },
          },
        },
        participants: true, // Inclui os participantes para calcular as chances
      },
      orderBy: {
        id: 'desc',
      },
    });

    const winners = lastRaffles.map((raffle) => {
      let remainingParticipants = raffle.participants.length;

      const skinsWithWinners = raffle.raffleSkins
        .filter((skin) => skin.winner_id !== null)
        .map((skin) => {
          const sanitizedWinner = { ...skin.winner.user };

          // Remover informações sensíveis
          delete sanitizedWinner.twitchId;
          delete sanitizedWinner.updatedAt;
          delete sanitizedWinner.password;
          delete sanitizedWinner.createdAt;

          // Calcular a chance de vitória
          const chance = (1 / remainingParticipants) * 100;

          // Reduz o número de participantes restantes
          remainingParticipants -= 1;

          return {
            skin: {
              id: skin.id,
              skinName: skin.skinName,
              skinValue: skin.skinValue,
              skinType: skin.skinType,
              skinPicture: skin.skinPicture,
            },
            winner: sanitizedWinner,
            chance: chance.toFixed(2) + '%',
          };
        });

      return {
        raffle: {
          id: raffle.id,
          name: raffle.name,
          value: raffle.value,
          is_active: raffle.is_active,
          createdAt: raffle.createdAt,
          updatedAt: raffle.updatedAt,
          skinsWithWinners: skinsWithWinners,
        },
      };
    });

    return winners;
  } catch (error) {
    console.error('Error fetching last winners: ', error);
    throw new Error('Could not fetch last winners');
  }
}

export async function update(id: number, data: Prisma.UserUpdateInput): Promise<User> {
  return prisma.user.update({
    where: { id },
    data,
  });
}

export async function incrementUserBalance(id: number, saldo: number): Promise<User> {
  console.log(`Adicionando saldo de ${saldo} ao usuário com ID: ${id}`);
  return prisma.user.update({
    where: { id },
    data: {
      saldo: {
        increment: saldo,
      },
    },
  });
}


export async function deleteUser(id: number): Promise<void> {
  const activeRaffles = await prisma.participant.findMany({
    where: {
      user_id: id,
      raffle: {
        is_active: 'Ativa',
      },
    },
    include: {
      raffle: true,
    },
  });

  if (activeRaffles.length > 0) {
    throw new Error('Você deve esperar todas as rifas serem finalizadas antes de deletar sua conta.');
  }

  await prisma.session.deleteMany({
    where: { user_id: id },
  });

  await prisma.participant.deleteMany({
    where: { user_id: id },
  });

  await prisma.user.delete({
    where: { id },
  });
}

async function findByResetToken(token: string) {
  return prisma.user.findFirst({
    where: {
      passwordResetToken: {
        not: null,
      },
    },
  });
}

async function decrementUserBalance(id: number, amount: number, prismaInstance: PrismaClient = prisma) {
  return prismaInstance.user.update({
    where: { id },
    data: {
      saldo: {
        decrement: amount,
      },
    },
  });
}

async function findByIdTransaction(id: number, prismaInstance: PrismaClient = prisma) {
  return prismaInstance.user.findUnique({
    where: { id },
  });
}

async function findUsersWithPagination(offset: number, limit: number, search: string) {
  const users = await prisma.user.findMany({
    where: {
      name: {
        contains: search,
        mode: 'insensitive',
      },
    },
    skip: offset,
    take: limit,
    orderBy: {
      name: 'asc',
    },
  });

  return users;
}

async function countUsers(search: string): Promise<number> {
  return prisma.user.count({
    where: {
      name: {
        contains: search,
        mode: 'insensitive',
      },
    },
  });
}

type Winner = {
  user: {
    id: number;
    name: string;
    email: string;
    picture: string,
  };
  totalWins: number;
  skinsWon: Array<{
    skinName: string;
    skinValue: number;
    skinType: string;
    skinPicture: string;
  }>;
  participations: number;
};

async function getTopWinnersWithSkinsAndParticipants(
  page: number, 
  itemsPerPage: number, 
  startDate?: Date, 
  endDate?: Date
) {
  const offset = (page - 1) * itemsPerPage;

  // Criando o mapa com a tipagem correta
  const winnersMap: { [key: number]: Winner } = {};

  // Definindo a cláusula where para o período, caso fornecido
  const dateFilter: any = {};
  if (startDate && endDate) {
    dateFilter.createdAt = {
      gte: startDate,
      lte: endDate,
    };
  } else if (startDate) {
    dateFilter.createdAt = {
      gte: startDate,
    };
  } else if (endDate) {
    dateFilter.createdAt = {
      lte: endDate,
    };
  }

  // Agrupar vencedores por winner_id, obtido via a tabela Participant
  const topWinners = await prisma.raffleSkin.groupBy({
    by: ['winner_id'],
    _count: {
      winner_id: true, // Contar quantas vezes o participante venceu
    },
    where: {
      winner_id: {
        not: null, // Considerar apenas aqueles que têm um vencedor
      },
      ...dateFilter, // Filtro de datas (opcional)
    },
  });

  // Organizar por maiores vitórias primeiro
  const sortedWinners = topWinners.sort((a, b) => b._count.winner_id - a._count.winner_id);

  // Buscar detalhes dos usuários, participações e as skins ganhas
  for (const winner of sortedWinners) {
    // Buscar o `user_id` do `winner_id` na tabela Participant
    const participant = await prisma.participant.findUnique({
      where: {
        id: winner.winner_id!, // Aqui pegamos o `winner_id` para obter o `user_id`
      },
      include: {
        user: true, // Aqui pegamos o `user_id` e os dados do `User`
      },
    });

    if (!participant || !participant.user) continue;

    const userId = participant.user.id; // Pegamos o `user_id`

    // Buscar todas as skins ganhas por este `user_id`
    const skinsWon = await prisma.raffleSkin.findMany({
      where: {
        winner_id: winner.winner_id,
        ...dateFilter, // Filtro de datas aplicado às skins
      },
    });

    // Contar o número de participações deste `user_id` na tabela `Participant`
    const participations = await prisma.participant.count({
      where: {
        user_id: userId,
        ...dateFilter, // Filtro de datas aplicado às participações
      },
    });

    // Se o usuário já existe no `winnersMap`, incrementa as vitórias e adiciona skins
    if (winnersMap[userId]) {
      winnersMap[userId].totalWins += winner._count.winner_id;
      winnersMap[userId].skinsWon.push(...skinsWon.map((skin) => ({
        skinName: skin.skinName,
        skinValue: skin.skinValue,
        skinType: skin.skinType,
        skinPicture: skin.skinPicture,
      })));
    } else {
      // Se o usuário não está no `winnersMap`, adiciona uma nova entrada
      winnersMap[userId] = {
        user: {
          id: participant.user.id,
          name: participant.user.name,
          email: participant.user.email,
          picture: participant.user.picture,

        },
        totalWins: winner._count.winner_id,
        skinsWon: skinsWon.map((skin) => ({
          skinName: skin.skinName,
          skinValue: skin.skinValue,
          skinType: skin.skinType,
          skinPicture: skin.skinPicture,
        })),
        participations, // Contagem de participações
      };
    }
  }

  // Transformar o `winnersMap` em uma lista e ordenar novamente para garantir que os maiores vencedores apareçam no topo
  const winnersList = Object.values(winnersMap).sort((a, b) => b.totalWins - a.totalWins);

  // Paginar os resultados após ordenar
  const paginatedWinners = winnersList.slice(offset, offset + itemsPerPage);

  return paginatedWinners;
}


const userRepository = {
  findByName,
  findUsersWithPagination,
  countUsers,
  decrementUserBalance,
  findByEmail,
  findById,
  create,
  createByTwitch,
  findByIdTransaction,
  updatedByTwitch,
  getLastWinners,
  update,
  findParticipantById,
  postWinners,
  deleteUser,
  incrementUserBalance,
  findByResetToken,
  getTopWinnersWithSkinsAndParticipants,
};

export default userRepository;
