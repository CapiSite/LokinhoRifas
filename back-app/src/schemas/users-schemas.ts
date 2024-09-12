import Joi from 'joi';
import { CreateUserParams, CreateVerifyParams, CreateWinnerParams } from '../services/users-service';
import { NextFunction } from 'express';

export const formDataSchema = Joi.object({
  picture: Joi.string(),
  signUpData: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    tradeLink: Joi.string().required(),
    picture: Joi.string().required(),
    phoneNumber: Joi.string().required(),
  }).required(),
});
export const formDataUpdateSchema = Joi.object({
  picture: Joi.string(),
  signUpData: Joi.object({
    newPassword: Joi.string().min(6).optional(),
    oldPassword: Joi.string().min(6).optional(),
    tradeLink: Joi.string(),
    picture: Joi.string(),
    phoneNumber: Joi.string(),
  }).required(),
});

export const verifyEmailSchema = Joi.object<CreateVerifyParams>({
  email: Joi.string().email().required(),
  name: Joi.string().optional(),
});

export const winnerSchema = Joi.object<CreateWinnerParams>({
  id: Joi.number().required(),
  number: Joi.number().required(),
  raffle_id: Joi.number().required(),
});
