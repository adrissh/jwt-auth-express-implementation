const express = require('express')
const router = express.Router()
const {generateNewAccessToken } = require('../controller/authController')

const {handleUserRegistration} = require('../controller/registerController')
const {userLoginController} = require('../controller/authController')
const {validateUserRegistration} = require('../middleware/validation/registerValidation')




// router.use(express.json()) // for parsing application/json
router.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

router.post('/register',validateUserRegistration, handleUserRegistration)
router.post('/login',userLoginController)
router.post('/refresh-token',generateNewAccessToken)



module.exports = router