import { Request, Response } from 'express';
import httpStatus from 'http-status';
import raffleService from '../services/raffle-service';
import { AuthenticatedRequest } from '../middlewares'; // Importando AuthenticatedRequest

export const cancelReservationController = async (req: AuthenticatedRequest, res: Response) => {
  const { raffleId, number } = req.body;
  console.log(number)
  try {
    // Usando o serviço para cancelar a reserva
    await raffleService.cancelRaffleNumberReservation(raffleId, number);
    return res.status(200).json({ message: 'Reserva cancelada com sucesso.' });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};



export const reserveRaffleNumberController = async (req: AuthenticatedRequest, res: Response) => {
  const { raffleId, number } = req.body;
  const userId = req.userId; // Obtendo o userId do usuário autenticado

  try {
    const result = await raffleService.reserveRaffleNumber(userId, raffleId, number);
    res.status(httpStatus.OK).json(result);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};

export const createRaffle = async (req: AuthenticatedRequest, res: Response) => {
  const { name, users_quantity, free ,skins } = req.body;
  const userId = req.userId; // Obtendo o userId do usuário autenticado

  try {
    const raffle = await raffleService.createRaffle({ name, users_quantity, free,skins, userId });

    res.status(httpStatus.CREATED).json(raffle);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({ message: error.message, error });
  }
};

export const activeRaffle = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.query;

  try {
    const raffle = await raffleService.activeRaffles(Number(id));

    res.status(httpStatus.CREATED).json(raffle);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({ message: error.message, error });
  }
};

export async function getRaffles(req: Request, res: Response) {
  try {
    const raffles = await raffleService.getRaffles();
    return res.status(httpStatus.OK).send(raffles);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function getAllRaffles(req: Request, res: Response) {
  try {
    const { page } = req.query;
    const raffles = await raffleService.getAllRaffles(Number(page));
    return res.status(httpStatus.OK).send(raffles);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export const deleteRaffle = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  try {
    const response = await raffleService.deleteRaffle(Number(id));
    res.status(httpStatus.NO_CONTENT).send(response); // Retorna 204 No Content ao deletar com sucesso
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({ message: error.message, error });
  }
};

export async function buyRaffleController(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const raffleArray = req.body.raffle as Array<{ id: number; numbers: number[] }>; // Alterado de quantity para numbers

  try {
    const result = await raffleService.buyRaffleService(userId, raffleArray);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
}


export async function addParticipantToRaffle(req: Request, res: Response) {
  const { raffleId, userId } = req.body;

  try {
    const participant = await raffleService.addParticipantToRaffle(raffleId, userId);
    return res.status(httpStatus.CREATED).json(participant);
  } catch (error) {
    console.error('Erro ao adicionar participante à rifa:', error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Erro ao adicionar participante à rifa');
  }
}

export async function removeParticipantFromRaffle(req: Request, res: Response) {
  const { raffleId, number } = req.body;
  try {
    await raffleService.removeParticipantFromRaffle(raffleId, number);
    return res.sendStatus(httpStatus.NO_CONTENT);
  } catch (error) {
    console.error('Erro ao remover participante da rifa:', error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Erro ao remover participante da rifa');
  }
}