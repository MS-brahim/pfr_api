const Joi = require('@hapi/joi');

// VALIDATION FIELDS USER
const createUserValidation = data =>{
    const schema = Joi.object({
        full_name: Joi.string()
            .min(4),
        email: Joi.string()
            .min(6),
        phone: Joi.string()
            .min(10),
        password: Joi.string()
            .min(3),
        cin: Joi.string()
            .min(4)
    });
    return schema.validate(data)
}

// VALIDATION LOGIN 
const loginValidation = data =>{
    const schema = Joi.object({
        phone: Joi.string()
            .min(10),
        password: Joi.string()
            .min(3)
    });
    return schema.validate(data)
}

module.exports.createUserValidation = createUserValidation;
module.exports.loginValidation = loginValidation;