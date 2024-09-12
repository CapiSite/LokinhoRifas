import { Request, Response } from 'express';
import httpStatus from 'http-status';
import userService from '../services/users-service';
import path from 'path';
import { unauthorizedError } from '../errors';
import { AuthenticatedRequest } from '../middlewares';

export async function postUser(req: Request, res: Response) {
  const { email, password, tradeLink, name, phoneNumber } = req.body.signUpData;
  let picture = 'default';
  if (req.file && req.file.path && req.body.signUpData.picture !== 'default') {
    picture = path.basename(req.file.path);
  }
  try {
    const user = await userService.createUser({ email, password, picture, tradeLink, name, phoneNumber });
    return res.status(httpStatus.CREATED).json({
      id: user.id,
      email: user.email,
    });
  } catch (error) {
    if (error.name === 'DuplicatedEmailError') {
      return res.status(httpStatus.CONFLICT).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function updateUser(req: AuthenticatedRequest, res: Response) {
  const { id } = req.params;
  try {
    if (req.userId !== Number(id) && !req.isAdmin) {
      throw unauthorizedError();
    }
    const updateData = req.body.signUpData;
    if (req.file && req.file.path) {
      const picture = path.basename(req.file.path);
      updateData.picture = picture;
    }

    await userService.updateUser(Number(id), updateData);
    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.status(httpStatus.NOT_FOUND).send('User not found');
    } else {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
  }
}

export async function deleteUser(req: AuthenticatedRequest, res: Response) {
  const { id } = req.params;
  try {
    if (req.userId !== Number(id) && !req.isAdmin) {
      throw unauthorizedError();
    }

    await userService.deleteUser(Number(id));
    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    if (error.message === 'Você deve esperar todas as rifas serem finalizadas antes de deletar sua conta.') {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send('Você deve esperar todas as rifas serem finalizadas antes de deletar sua conta.');
    } else {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }
}

export async function verifyEmail(req: Request, res: Response) {
  const { email, name } = req.body;
  try {
    await userService.verifyEmail({ email, name });
    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    if (error.name === 'DuplicatedEmailError') {
      return res.status(httpStatus.CONFLICT).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function getWinners(req: Request, res: Response) {
  try {
    const { page, itemsPerPage } = req.query;
    const winners = await userService.getWinners(Number(page), Number(itemsPerPage));
    return res.status(httpStatus.OK).send(winners);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}
export async function postWinners(req: Request, res: Response) {
  try {
    const { id, number, raffle_id } = req.body;
    console.log(id, number, raffle_id);
    const winner = await userService.postWinners(id, number, raffle_id);
    console.log(winner);
    return res.status(httpStatus.OK).send(winner);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
}

export async function getUsers(req: Request, res: Response) {
  const { page = '1', search = '' } = req.query;

  try {
    const pageNumber = Number(page);
    const usersPerPage = 20;

    const { users, totalPages, currentPage } = await userService.getUsers(pageNumber, usersPerPage, search as string);

    return res.status(httpStatus.OK).json({
      users,
      totalPages,
      currentPage,
    });
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Erro ao buscar usuários');
  }
}

export async function getWinnersRank(req: Request, res: Response) {
  try {
    const { page, itemsPerPage, startDate, endDate } = req.query;
    const rank = await userService.getWinnersRank(
      Number(page),
      Number(itemsPerPage),
      startDate ? new Date(startDate as string) : undefined,
      endDate ? new Date(endDate as string) : undefined,
    );
    return res.status(httpStatus.OK).send(rank);
  } catch (error) {
    console.error(error);
    return res.status(httpStatus.BAD_REQUEST).send({ error: 'Could not fetch winners rank' });
  }
}
