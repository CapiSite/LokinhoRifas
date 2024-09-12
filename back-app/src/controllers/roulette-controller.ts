import rouletteService from "../services/roulette-service";
import httpStatus from "http-status";
import { Request, Response } from 'express';

export async function getParticipants(req: Request, res: Response) {
    try {
      const participants = await rouletteService.getParticipants();
      return res.status(httpStatus.OK).send(participants);
    } catch (error) {
      return res.status(httpStatus.BAD_REQUEST).send(error);
    }
  }

export async function getParticipantsByRaffleId(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { page } = req.query;
    const participants = await rouletteService.getParticipantsByRaffleId(Number(id), Number(page));
    return res.status(httpStatus.OK).send(participants);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function getParticipantsByRaffleIdAndUserName(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { page, name } = req.query;
    const participants = await rouletteService.getParticipantsByRaffleName(Number(id), String(name) ,Number(page));
    return res.status(httpStatus.OK).send(participants);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

