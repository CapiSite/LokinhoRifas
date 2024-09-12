import Joi from 'joi';

export const textSchema = Joi.object({
    text: Joi.string().required(),
});

