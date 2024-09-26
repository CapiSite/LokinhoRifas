import { Request, Response } from 'express';
import httpStatus from 'http-status';
import authenticationService, { SignInParams, TwitchParams } from '../services/authentication-service';
import userService from '../services/users-service';
import { sendPasswordResetEmail } from '../services/email-service';

export async function singInPost(req: Request, res: Response) {
  const { email, password } = req.body as SignInParams;

  try {
    const result = await authenticationService.signIn({ email, password });

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send({});
  }
}

export async function twitchPost(req: Request, res: Response) {
  const { code } = req.body as TwitchParams;
  try {
    const result = await authenticationService.twitchSignIn(code);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send(error.message);
  }
}

export default async function authUser(req: Request, res: Response) {
  const userId = (req as any).userId;
  if (!userId) {
    return res.status(httpStatus.UNAUTHORIZED).send('User ID not found');
  }

  try {
    const result = await authenticationService.userInfo(userId);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send('An error occurred');
  }
}

export async function requestPasswordReset(req: Request, res: Response) {
  const { email } = req.body;

  try {
    const token = await userService.generatePasswordResetToken(email);
    await sendPasswordResetEmail(email, token);
    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
}

export async function resetPassword(req: Request, res: Response) {
  const { token, newPassword } = req.body;
  console.log(token, newPassword)
  try {
    await userService.resetPassword(token, newPassword);
    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
}
