const Joi = require("joi");

const signupValidation = Joi.object({
    name: Joi.string().min(3).max(15).required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    confirm_password: Joi.ref("password"),
    mobile: Joi.number().integer(),
    email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
    }),
});

const signinValidation = Joi.object({
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
    email: Joi.string().required().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
    }),
});

module.exports = {
    signupValidation,
    signinValidation
}