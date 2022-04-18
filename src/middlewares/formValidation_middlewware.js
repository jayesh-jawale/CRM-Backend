const Joi = require('joi');

const email = Joi.string()
.email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })

const pin = Joi.number()
.min(100000)
.max(999999)
.required();

const newPassword = Joi.string().alphanum().min(3).max(30).required();
const subject = Joi.string().min(2).max(50).required();
const sender = Joi.string().min(2).max(50).required();
const message = Joi.string().min(2).max(500).required();
const issueDate = Joi.date().required();

const name = Joi.string().min(2).max(50).required();
const company = Joi.string().min(2).max(50).required();
const address = Joi.string().min(2).max(500).required();
const phone = Joi.number().required();
const password = Joi.string().min(2).max(50).required();

//-------------------------------------------------------------------------------------------------------
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

const createTicketValidation = (req, res, next) => {
    const schema = Joi.object({subject, sender, issueDate, message});
    const data = schema.validate(req.body);

    if(data.error) {
        return res.json({ status: "error", message: data.error.message})
     }
     next();
}   

const updateTicketValidation = (req, res, next) => {
    const schema = Joi.object({sender, message});
    const data = schema.validate(req.body);

    if(data.error) {
        return res.json({ status: "error", message: data.error.message})
     }
     next();
}

const newUserValidation = (req, res, next) => {
    const schema = Joi.object({name, company, address, phone, email, password});
    const data = schema.validate(req.body);

    if(data.error) {
        return res.json({ status: "error", message: data.error.message})
     }
     next();
}  

module.exports = {
    resetPasswordValidation,
    udatePasswordValidation,
    createTicketValidation,
    updateTicketValidation,
    newUserValidation,
}