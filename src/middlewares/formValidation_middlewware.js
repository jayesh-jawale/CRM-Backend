const Joi = require('joi');

const email = Joi.string()
.email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })

const pin = Joi.number()
.min(100000)
.max(999999)
.required();

const newPassword = Joi.string().alphanum().min(3).max(30).required();

const resetPasswordValidation = (req, res, next) => {
    const schema = Joi.object({email});
    const data = schema.validate(req.body)

    if(data.error) {
       return res.json({ status: "error", message: data.error.message})
    }
    next();
}

const udatePasswordValidation = (req, res, next) => {
    const schema = Joi.object({email, pin, newPassword});
    const data = schema.validate(req.body)

    if(data.error) {
        return res.json({ status: "error", message: data.error.message})
     }
     next();
}

module.exports = {
    resetPasswordValidation,
    udatePasswordValidation,
}