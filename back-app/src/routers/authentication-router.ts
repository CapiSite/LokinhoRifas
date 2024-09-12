import { Router } from 'express';
import { singInPost, twitchPost } from '../controllers';
import { authenticateToken, validateBody } from '../middlewares';
import { signInSchema, twitchSchema } from '../schemas';
import authUser, { requestPasswordReset, resetPassword } from '../controllers/authentication-controller';

const authenticationRouter = Router();

authenticationRouter.post('/sign-in', validateBody(signInSchema), singInPost);
authenticationRouter.post('/twitch', validateBody(twitchSchema), twitchPost);
authenticationRouter.post('/', authenticateToken, authUser);
authenticationRouter.post('/forgot-password', requestPasswordReset);
authenticationRouter.post('/reset-password', resetPassword);

export { authenticationRouter };
