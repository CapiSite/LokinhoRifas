import { Router } from 'express';

import { formDataSchema, formDataUpdateSchema, verifyEmailSchema, winnerSchema } from '../schemas';
import { authenticateAdmin, authenticateToken, parseData, validateBody } from '../middlewares';
import { getWinners, updateUser, postUser, verifyEmail, postWinners, deleteUser, getUsers, getWinnersRank } from '../controllers';
import {uploadMain} from '../middlewares/multer-config';
import { checkPictureType } from '../middlewares/check-picture-type';

const usersRouter = Router();

usersRouter.post('/', checkPictureType, uploadMain.single('picture'), parseData, validateBody(formDataSchema), postUser);
usersRouter.post('/verify', validateBody(verifyEmailSchema), verifyEmail);
usersRouter.put('/update/:id', authenticateToken, checkPictureType, uploadMain.single('picture'), parseData, validateBody(formDataUpdateSchema), updateUser);
usersRouter.delete('/:id', authenticateToken, deleteUser)
usersRouter.delete('/:id/admin', authenticateToken, authenticateAdmin, deleteUser)
usersRouter.post('/winners', authenticateToken, authenticateAdmin, validateBody(winnerSchema), postWinners);
usersRouter.get('/', authenticateToken, authenticateAdmin, getUsers);
usersRouter.get('/winners', getWinners);
usersRouter.get('/rank', getWinnersRank);

export { usersRouter };
