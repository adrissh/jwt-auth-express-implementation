const {registerUser} = require('../users/users')

const handleUserRegistration = async (req,res)=>{
    const {username,password}= req.body
    await registerUser(username,password)
    return res.status(201).json({
        status : 'Success',
        statusCode : 201,
        timestmp : new Date(),
        message : "User registered",
    })
}



module.exports = {handleUserRegistration}