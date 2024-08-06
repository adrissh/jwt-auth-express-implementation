const {body,validationResult} = require('express-validator')


const validateUserRegistration = [
    body('password')
    .isLength({min : 8}).withMessage('password must be at least 8 characters long')
    .notEmpty().withMessage('password cannot be empty')
    .matches(/\d/).withMessage('password must contain number')
    .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain at least one special character')
    .matches(/^\S+$/).withMessage('password must not contain white space')
    .matches(/^(?=.*[A-Z]).+$/).withMessage('Password must contain at least one capital letter'),

    body('email')
    .notEmpty().withMessage('email cannot be empty')
    .isEmail().withMessage('email must be a valid'),

    body('role')
    .notEmpty().withMessage('role cannot be empty')
    .isIn(['admin','user','guest']).withMessage('Role must be one of the following: admin, user, guest'),

    (req,res,next)=>{
        const myValidationResult = validationResult.withDefaults({
            formatter : error => error.msg
        });
        const errors = myValidationResult(req).array()
        if(errors.length > 0){
            return res.status(400).json(
                {
                    errors
                }
            )
        }

        next()
    }
]





module.exports={validateUserRegistration}