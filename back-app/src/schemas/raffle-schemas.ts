import { RaffleParams } from '../utils/types';
import Joi from 'joi';

interface RafflePurchaseParams {
    id: number;
    quantity: number;
}


export const raffleSchema = Joi.object<RaffleParams>({
    name: Joi.string().required().messages({
        'string.empty': 'O nome da rifa é obrigatório',
    }),
    users_quantity: Joi.number().integer().min(1).required().messages({
        'number.base': 'A quantidade de números deve ser um número inteiro',
        'number.min': 'A quantidade de números deve ser maior que zero',
        'any.required': 'A quantidade de números é obrigatória'
    }),
    skins: Joi.array().items(
        Joi.object({
            id: Joi.number().integer().required().messages({
                'number.base': 'O ID da skin deve ser um número inteiro',
                'any.required': 'O ID da skin é obrigatório'
            })
        })
    ).min(1).required().messages({
        'array.min': 'É necessário selecionar ao menos uma skin',
        'any.required': 'As skins são obrigatórias'
    })
});

export const buyRaffleSchema = Joi.object({
    raffle: Joi.array().items(
        Joi.object<RafflePurchaseParams>({
            id: Joi.number().required().messages({
                'number.base': 'O id da rifa deve ser um número inteiro',
                'any.required': 'O id da rifa é obrigatório'
            }),
            quantity: Joi.number().integer().min(1).required().messages({
                'number.base': 'A quantidade de números deve ser um número inteiro',
                'number.min': 'A quantidade de números deve ser maior que zero',
                'any.required': 'A quantidade de números é obrigatória'
            }),
        })
    ).required().messages({
        'array.base': 'As rifas devem ser fornecidas como um array',
        'array.required': 'As rifas são obrigatórias'
    })
});

export const addParticipantSchema = Joi.object({
    raffleId: Joi.number().required(),
    userId: Joi.number().required(),
  });
  
export const removeParticipantSchema = Joi.object({
    raffleId: Joi.number().required(),
    number: Joi.number().required(),
});