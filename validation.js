//Validation
const Joi = require("@hapi/joi");

const registerValidation = (data) =>{
    const schemaUser = Joi.object({
        name: Joi.string()
          .min(6)
          .required(),
        email: Joi.string()
          .min(6)
          .required()
          .email(),
        password: Joi.string()
          .pattern(/^[a-zA-Z0-9]{6,30}$/)
          .min(6)
          .required()
      });
    
    return  schemaUser.validate(data);
};

const loginValidation = (data) =>{
    const schemaLogin = Joi.object({
        email: Joi.string()
          .min(6)
          .required()
          .email(),
        password: Joi.string()
          .pattern(/^[a-zA-Z0-9]{6,30}$/)
          .min(6)
          .required()
      });
    
    return  schemaLogin.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;