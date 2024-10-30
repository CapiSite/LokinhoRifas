import { Router } from 'express';
import { authenticateToken, authenticateAdmin, validateBody } from '../middlewares';
import {
  activeRaffle,
  createRaffle,
  deleteRaffle,
  getAllRaffles,
  getRaffles,
  buyRaffleController,
  addParticipantToRaffle,
  removeParticipantFromRaffle,
  reserveRaffleNumberController,
  getRafflesForRoulette,
} from '../controllers/raffle-controller';
import { raffleSchema, buyRaffleSchema, addParticipantSchema, removeParticipantSchema } from '../schemas';

const raffleRouter = Router();

raffleRouter.post('/', authenticateToken, authenticateAdmin, validateBody(raffleSchema), createRaffle);
raffleRouter.post('/active', authenticateToken, authenticateAdmin, activeRaffle);
raffleRouter.get('/', getRaffles);
raffleRouter.get('/getRafflesForRoulette', getRafflesForRoulette);
raffleRouter.get('/allRaffle', authenticateToken, authenticateAdmin, getAllRaffles);
raffleRouter.delete('/remove-raffle/:id', authenticateToken, authenticateAdmin, deleteRaffle);
raffleRouter.post(
  '/add-user',
  authenticateToken,
  authenticateAdmin,
  validateBody(addParticipantSchema),
  addParticipantToRaffle,
);
raffleRouter.delete(
  '/remove-user',
  authenticateToken,
  authenticateAdmin,
  validateBody(removeParticipantSchema),
  removeParticipantFromRaffle,
);
raffleRouter.post(
  '/reserveRaffleNumbers',
  authenticateToken,
  validateBody(buyRaffleSchema),
  reserveRaffleNumberController,
);
raffleRouter.post('/buyRaffle', authenticateToken, validateBody(buyRaffleSchema), buyRaffleController);

export { raffleRouter };
