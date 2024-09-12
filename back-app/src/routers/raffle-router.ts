import { Router } from 'express';
import { authenticateToken, authenticateAdmin, validateBody } from '../middlewares';
import { activeRaffle, createRaffle, deleteRaffle, getAllRaffles, getRaffles, buyRaffleController, addParticipantToRaffle, removeParticipantFromRaffle } from '../controllers/raffle-controller';
import { raffleSchema, buyRaffleSchema, addParticipantSchema, removeParticipantSchema } from '../schemas';

const raffleRouter = Router();

raffleRouter.post('/', authenticateToken, authenticateAdmin, validateBody(raffleSchema), createRaffle);
raffleRouter.post('/active', authenticateToken, authenticateAdmin, activeRaffle);
raffleRouter.get('/', getRaffles);
raffleRouter.get('/allRaffle', authenticateToken, authenticateAdmin, getAllRaffles);
raffleRouter.delete('/remove-raffle/:id', authenticateToken, authenticateAdmin, deleteRaffle);
raffleRouter.post('/buyRaffle', authenticateToken, validateBody(buyRaffleSchema), buyRaffleController);
raffleRouter.post('/add-user', authenticateToken, authenticateAdmin, validateBody(addParticipantSchema), addParticipantToRaffle);
raffleRouter.delete('/remove-user', authenticateToken, authenticateAdmin, validateBody(removeParticipantSchema), removeParticipantFromRaffle);


export { raffleRouter };
