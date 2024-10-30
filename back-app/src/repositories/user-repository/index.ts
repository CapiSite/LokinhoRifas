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

    // Verifica se o participante existe e se seu número está pago
    const participant = await prisma.participant.findUnique({
      where: {
        id: params.participantId,
      },
    });

    if (!participant) {
      throw new Error('Participant not found');
    }

    if (!participant.is_paid) {
      throw new Error('Participant number is not paid');
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
    // Passo 1: Buscar as skins com updatedAt não nulo
    const skinsWithUpdatedAt = await prisma.raffleSkin.findMany({
      take: itemsPerPage,
      skip: (page - 1) * itemsPerPage,
      where: {
        winner_id: { not: null }, // Filtra apenas skins com ganhadores
        updatedAt: { not: null }, // Apenas com updatedAt não nulo
      },
      orderBy: {
        updatedAt: 'desc', // Ordena por updatedAt das skins
      },
      include: {
        raffle: {
          include: {
            participants: true, // Inclui os participantes para calcular as chances
          },
        },
        winner: {
          include: {
            user: true, // Inclui informações do usuário vencedor
          },
        },
      },
    });

    // Passo 2: Buscar as skins com updatedAt nulo e ordenar pelo updatedAt da rifa
    const skinsWithoutUpdatedAt = await prisma.raffleSkin.findMany({
      take: itemsPerPage,
      skip: (page - 1) * itemsPerPage,
      where: {
        winner_id: { not: null }, // Filtra apenas skins com ganhadores
        updatedAt: null, // Apenas com updatedAt nulo
      },
      orderBy: {
        raffle: { updatedAt: 'desc' }, // Ordena pelo updatedAt da rifa
      },
      include: {
        raffle: {
          include: {
            participants: true, // Inclui os participantes para calcular as chances
          },
        },
        winner: {
          include: {
            user: true, // Inclui informações do usuário vencedor
          },
        },
      },
    });

    // Passo 3: Concatenar os resultados (skins com updatedAt primeiro, depois sem)
    const recentSkins = [...skinsWithUpdatedAt, ...skinsWithoutUpdatedAt];

    // Agrupar as rifas e mapear os dados
    const raffles = recentSkins.reduce((acc, skin) => {
      const raffle = skin.raffle;
      let raffleData = acc.find((r) => r.raffle.id === raffle.id);

      if (!raffleData) {
        raffleData = {
          raffle: {
            id: raffle.id,
            name: raffle.name,
            value: raffle.value,
            is_active: raffle.is_active,
            createdAt: raffle.createdAt,
            updatedAt: raffle.updatedAt,
            skinsWithWinners: [],
          },
        };
        acc.push(raffleData);
      }

      const sanitizedWinner = { ...skin.winner.user };

      // Remover informações sensíveis do ganhador
      delete sanitizedWinner.twitchId;
      delete sanitizedWinner.updatedAt;
      delete sanitizedWinner.password;
      delete sanitizedWinner.createdAt;

      // Calcular a chance de vitória
      const chance = (1 / raffle.participants.length) * 100;

      // Aqui estamos pegando o número do participante (ganhador)
      const winnerNumber = skin.winner.number;

      raffleData.raffle.skinsWithWinners.push({
        skin: {
          id: skin.id,
          skinName: skin.skinName,
          skinValue: skin.skinValue,
          skinType: skin.skinType,
          skinPicture: skin.skinPicture,
        },
        winner: {
          ...sanitizedWinner,
          number: winnerNumber, // Adiciona o número do ganhador aqui
        },
        chance: chance.toFixed(2) + '%',
      });

      return acc;
    }, []);

    return raffles;
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
    picture: string;
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
  endDate?: Date,
) {
  const offset = (page - 1) * itemsPerPage;

  // Criando o mapa com a tipagem correta para armazenar os vencedores
  const winnersMap: { [key: number]: Winner } = {};

  // Definindo a cláusula where para o período com base no campo createdAt (data do sorteio da skin)
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

  // Agrupar vencedores por winner_id na tabela RaffleSkin e contar quantas vezes o participante venceu
  const topWinners = await prisma.raffleSkin.groupBy({
    by: ['winner_id'],
    _count: {
      winner_id: true,
    },
    where: {
      winner_id: {
        not: null, // Filtra para pegar apenas aqueles que têm um vencedor
      },
      ...dateFilter, // Aplica o filtro de datas baseado em createdAt
    },
  });

  // Organizar vencedores com base no número de vitórias
  const sortedWinners = topWinners.sort((a, b) => b._count.winner_id - a._count.winner_id);

  // Buscar detalhes dos vencedores e suas skins ganhas
  for (const winner of sortedWinners) {
    // Obter o participante a partir do winner_id
    const participant = await prisma.participant.findUnique({
      where: {
        id: winner.winner_id!, // Usar o winner_id para buscar o participant e seus dados
      },
      include: {
        user: true, // Incluir os dados do usuário vencedor
      },
    });

    if (!participant || !participant.user) continue;

    const userId = participant.user.id;

    // Buscar todas as skins ganhas por este usuário com o filtro de datas
    const skinsWon = await prisma.raffleSkin.findMany({
      where: {
        winner_id: winner.winner_id,
        ...dateFilter, // Aplica o filtro de datas baseado no campo createdAt
      },
    });

    // Contar o número de participações deste usuário no período fornecido
    const participations = await prisma.participant.count({
      where: {
        user_id: userId,
        raffle: {
          raffleSkins: {
            some: dateFilter, // Filtro de datas para contar participações com base na skin sorteada
          },
        },
      },
    });

    // Se o usuário já está no winnersMap, adicionar as vitórias e skins ganhas
    if (winnersMap[userId]) {
      winnersMap[userId].totalWins += winner._count.winner_id;
      winnersMap[userId].skinsWon.push(
        ...skinsWon.map((skin) => ({
          skinName: skin.skinName,
          skinValue: skin.skinValue,
          skinType: skin.skinType,
          skinPicture: skin.skinPicture,
        })),
      );
    } else {
      // Caso contrário, adicionar um novo vencedor ao mapa
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
        participations, // Número de participações do usuário no período
      };
    }
  }

  // Transformar winnersMap em uma lista e ordenar por número de vitórias
  const winnersList = Object.values(winnersMap).sort((a, b) => b.totalWins - a.totalWins);

  // Paginação dos resultados
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
