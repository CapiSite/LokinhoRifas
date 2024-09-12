import { createRaffle, getParticipants, getParticipantsByRaffleId, getParticipantsByRaffleIdAndUserName } from '../controllers';
import { authenticateToken, validateBody } from '../middlewares';
import { Router } from 'express';
import { authenticateAdmin } from '../middlewares/authentication-admin-middleware';
const rouletteRouter = Router();

rouletteRouter.post('/spin', authenticateToken);
rouletteRouter.get('/participants', getParticipants)
rouletteRouter.get('/participants/:id', authenticateToken, authenticateAdmin, getParticipantsByRaffleId)
rouletteRouter.get('/participants/raffle/:id', authenticateToken, authenticateAdmin, getParticipantsByRaffleIdAndUserName)




export { rouletteRouter };
