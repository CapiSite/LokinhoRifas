import { Participant, User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { duplicatedEmailError, duplicatedNameError } from './errors';
import userRepository from '../../repositories/user-repository';
import fs from 'fs';
import path from 'path';
export async function createUser({
  email,
  password,
  picture,
  tradeLink,
  name,
  phoneNumber,
}: CreateUserParams): Promise<User> {
  await validateUniqueEmailOrFail(email);
  const hashedPassword = await bcrypt.hash(password, 12);
  return userRepository.create({
    email,
    password: hashedPassword,
    picture: picture,
    tradeLink,
    name,
    phoneNumber,
  });
}

export async function verifyEmail({ email, name }: CreateVerifyParams) {
  await validateUniqueEmailOrFail(email);
  if (name) {
    const userWithSameName = await userRepository.findByName(name);
    if (userWithSameName) {
      throw duplicatedNameError();
    }
  } else return;
}

async function validateUniqueEmailOrFail(email: string) {
  const userWithSameEmail = await userRepository.findByEmail(email);
  if (userWithSameEmail) {
    throw duplicatedEmailError();
  }
}

async function getWinners(page: number, itemsPerPage: number) {
  const winners = await userRepository.getLastWinners(page, itemsPerPage);
  return winners;
}

async function deleteUser(id: number) {
  // Primeiro, encontre o usuário pelo ID para obter seus dados
  const user = await userRepository.findById(id);
  if (!user) {
    throw new Error('User not found');
  }

  // Se o usuário tiver uma foto e ela não for a imagem padrão, exclua a foto
  if (user.picture && user.picture !== 'default') {
    const picturePath = path.join(__dirname, '../../uploads', user.picture);
    
    // Verifica se a foto existe e tenta excluí-la
    fs.access(picturePath, fs.constants.F_OK, (err) => {
      if (!err) {
        fs.unlink(picturePath, (unlinkErr) => {
          if (unlinkErr) {
            console.error(`Erro ao deletar a foto do usuário: ${unlinkErr}`);
          } else {
            console.log(`Foto do usuário deletada: ${picturePath}`);
          }
        });
      }
    });
  }

  // Agora que a foto foi removida (se aplicável), deletar o usuário do banco de dados
  const deletedUser = await userRepository.deleteUser(id);
  return deletedUser;
}

async function postWinners(id: number, number: number, raffle_id: number) {
  const winner = await userRepository.findParticipantById(id);
  if (!winner) {
    throw new Error('Participant not found');
  }

  if (winner.raffle_id !== raffle_id) {
    throw new Error('Raffle not found');
  }

  // Chamada ajustada para usar `participantId` e `raffleId`
  await userRepository.postWinners({
    participantId: winner.id, // O `id` correto do participante
    raffleId: raffle_id,
  });

  return winner;
}

export async function updateUser(
  id: number,
  updateData: { oldPassword?: string; newPassword?: string; email?: string; password?: string; picture?: string },
) {
  const user = await userRepository.findById(id);
  if (!user) {
    throw new Error('User not found');
  }

  if (updateData.oldPassword && updateData.newPassword) {
    const passwordMatches = await bcrypt.compare(updateData.oldPassword, user.password);
    if (!passwordMatches) {
      throw new Error('Invalid old password');
    }

    const hashedPassword = await bcrypt.hash(updateData.newPassword, 12);
    updateData.password = hashedPassword;
  }

  // Deleta a foto antiga se uma nova foto for fornecida
  if (updateData.picture && user.picture && user.picture !== 'default') {
    const oldPicturePath = path.join(__dirname, '../../uploads', user.picture);
    fs.unlink(oldPicturePath, (err) => {
      if (err) {
        console.error(`Erro ao deletar a foto antiga: ${err}`);
      } else {
        console.log(`Foto antiga deletada: ${oldPicturePath}`);
      }
    });
  }

  const { oldPassword, newPassword, ...dataToUpdate } = updateData;

  return userRepository.update(id, dataToUpdate);
}

async function generatePasswordResetToken(email: string): Promise<string> {
  const user = await userRepository.findByEmail(email);
  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  // Gerar um token simples (UUID)
  const token = uuidv4();
  const hashedToken = await bcrypt.hash(token, 12);

  // Salvar o token hashado no banco de dados com a expiração
  await userRepository.update(user.id, {
    passwordResetToken: hashedToken,
    tokenExpiration: new Date(Date.now() + 3600000), // 1 hora de validade
  });

  return token; // Retorna o token não criptografado para ser enviado por e-mail
}

async function resetPassword(token: string, newPassword: string) {
  const user = await userRepository.findByResetToken(token);
  if (!user || !user.passwordResetToken || user.tokenExpiration < new Date()) {
    throw new Error('Token inválido ou expirado');
  }

  // Comparar o token fornecido pelo usuário com o token armazenado no banco de dados
  const isValidToken = await bcrypt.compare(token, user.passwordResetToken);
  if (!isValidToken) {
    throw new Error('Token inválido');
  }

  // Atualizar a senha do usuário
  const hashedPassword = await bcrypt.hash(newPassword, 12);
  await userRepository.update(user.id, {
    password: hashedPassword,
    passwordResetToken: null,
    tokenExpiration: null,
  });
}

async function getUsers(page: number, limit: number, search: string) {
  const offset = (page - 1) * limit;
  const users = await userRepository.findUsersWithPagination(offset, limit, search);
  const totalUsers = await userRepository.countUsers(search);
  const totalPages = Math.ceil(totalUsers / limit);

  // Filtra as informações sensíveis dos usuários
  const filteredUsers = users.map((user) => ({
    id: user.id,
    email: user.email,
    name: user.name,
    phoneNumber: user.phoneNumber,
    picture: user.picture,
    tradeLink: user.tradeLink,
    isAdmin: user.isAdmin,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    saldo: user.saldo,
    // Excluímos as informações sensíveis como password, tokenExpiration, etc.
  }));

  return {
    users: filteredUsers,
    totalPages,
    currentPage: page,
  };
}
async function getWinnersRank(page: number, itemsPerPage: number, startDate?: Date, endDate?: Date) {
  return await userRepository.getTopWinnersWithSkinsAndParticipants(page, itemsPerPage, startDate, endDate);
}

export type CreateUserParams = Omit<
  User,
  | 'twitchId'
  | 'facebookId'
  | 'id'
  | 'createdAt'
  | 'updatedAt'
  | 'isAdmin'
  | 'saldo'
  | 'passwordResetToken'
  | 'tokenExpiration'
>;

export type CreateVerifyParams = Pick<User, 'email' | 'name'>;

export type CreateWinnerParams = Omit<Participant, 'user_id'>;
const userService = {
  createUser,
  verifyEmail,
  getWinners,
  updateUser,
  getUsers,
  postWinners,
  deleteUser,
  generatePasswordResetToken,
  resetPassword,
  getWinnersRank,
};

export * from './errors';
export default userService;
