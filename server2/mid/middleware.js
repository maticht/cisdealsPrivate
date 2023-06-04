const Joi = require('joi')

exports.valid = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(1).max(50).required(),
        password: Joi.string().min(1).max(50).required()
    })
    return schema.validate(data);
}

