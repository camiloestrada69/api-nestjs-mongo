import * as Joi from 'joi';

export const validationSchema = Joi.object({
    NODE_ENV: Joi.string().valid(
        'development',
        'production',
        'qas',
        'test',
        'provision',
    ),
    PORT: Joi.number().default(3000),
});
