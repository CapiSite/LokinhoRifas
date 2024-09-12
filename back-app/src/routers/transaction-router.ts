import { Router } from 'express';

import { authenticateToken } from '../middlewares';
import { getTransaction } from '../controllers';


const transactionRouter = Router();

transactionRouter.get('/', authenticateToken, getTransaction);

export { transactionRouter };

