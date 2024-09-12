import { Router } from 'express';

import { authenticateAdmin, authenticateToken, validateBody } from '../middlewares';
import { getText, postText } from '../controllers';
import { textSchema } from '../schemas/text-schemas';


const textRouter = Router();

textRouter.get('/', getText);
textRouter.post('/', authenticateToken, authenticateAdmin,validateBody(textSchema), postText);

export { textRouter };

