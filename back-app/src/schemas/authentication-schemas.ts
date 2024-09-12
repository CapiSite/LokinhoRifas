import Joi from 'joi';
import { SignInParams, TwitchParams } from '../services';

export const signInSchema = Joi.object<SignInParams>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const twitchSchema = Joi.object<TwitchParams>({
  code: Joi.string().required(),
});
