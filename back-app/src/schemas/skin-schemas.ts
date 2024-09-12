import Joi from 'joi';

export const skinSchema = Joi.object({
    picture: Joi.string().required(),
    skinData: Joi.object({
        name: Joi.string().required(),
        value: Joi.number().min(0).required(),
        type: Joi.string().required(),
        picture: Joi.string().required(),
    }).required()
})


export const skinIdSchema = Joi.object({
    id: Joi.number().integer().required()
});

export const skinSchemaUpload = Joi.object({
    picture: Joi.string().optional(),
    skinData: Joi.object({
        name: Joi.string().optional(),
        value: Joi.number().min(0).optional(),
        type: Joi.string().optional(),
        picture: Joi.string().optional(),
    }).required()
})