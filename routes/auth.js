const express = require('express')
const router = express.Router()
const {generateNewAccessToken } = require('../controller/authController')

const {handleUserRegistration} = require('../controller/registerController')
const { userLoginController } = require('../controller/authController')




// router.use(express.json()) // for parsing application/json
router.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

router.post('/register',handleUserRegistration)
router.post('/login',userLoginController)
router.post('/refresh-token',generateNewAccessToken)



module.exports = router