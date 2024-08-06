const {registerUser} = require('../users/users')
const {showData} = require('../users/users')


const handleUserRegistration = async (req,res)=>{
    const {username,password,email,role}= req.body
    await registerUser(username,password,email,role)
    showData()
    return res.status(201).json({
        status : 'Success',
        statusCode : 201,
        timestmp : new Date(),
        message : "User registered",
    })
}



module.exports = {handleUserRegistration}