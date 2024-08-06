const {findUserByUsername,findRefreshToken, pushRefreshToken} = require('../users/users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const userLoginController = async(req,res)=>{
    const {username,password}= req.body;
    const user = findUserByUsername(username)
    // console.log(user)

    // cek user in array 
    if(user == undefined){
        return res.status(400).json({
            status : 'failed',
            statusCode : 400,
            timestmp : new Date(),
            message : 'Cannot find user',
        })
    }

    // verify password
    if(await bcrypt.compare(password,user.password)){
        const expiresIn = 60;  // second
        const expirationDate = new Date(Date.now() + expiresIn * 1000);
        const generateToken = jwt.sign({username : user.username , email :user.email, role: user.role },process.env.SECRET_KEY,{expiresIn})
        const generateRefreshToken = jwt.sign({username : user.username, role: user.role},process.env.REFRESH_SECRET_KEY,{expiresIn : '60m'})
        // console.log(generateToken)
        pushRefreshToken(generateRefreshToken)
        // showData()

        // set cookies acces-token & refresh-token
        res.cookie('accessToken',generateToken,{
            httpOnly : true,
            secure : false,
            sameSite : 'strict'
        })
        res.cookie('refreshToken',generateRefreshToken,{
            httpOnly : true,
            secure : false,
            sameSite : 'strict'
        })

        return res.status(200).json({
            status : 'success',
            statusCode : 200,
            timestmp : new Date(),
            message : "Login Successfully",
            data :{
                accessToken : generateToken,
                refreshToken : generateRefreshToken,
                expiresIn : expiresIn,
                expiresAt: expirationDate.toISOString() // ISO string format
            }
        })
    }else{
        return res.status(401).json({
            status : 'error',
            statusCode : 401,
            timestmp : new Date(),
            errors : [
                {
                    field: 'password',
                    message : 'Credential Not Valid'
                }
            ]
        })
    }

}



const generateNewAccessToken  = async(req,res)=>{
    const oldRefreshToken = req.cookies['refreshToken']
  if(!oldRefreshToken){
    return res.status(401).json({ 
      status : 'failed',
      statusCode : 401,
      error : {
        message: 'Refresh token is required'
      }

    });
  }

  try{
    const decode = jwt.verify(oldRefreshToken,process.env.REFRESH_SECRET_KEY)

    console.log(`hasil decode Refresh-token ${JSON.stringify(decode)}`)
    
    const newAccesToken = jwt.sign({username : decode.username , email : decode.email , role : decode.role},process.env.SECRET_KEY,{expiresIn : '2m'})
    const newRefreshToken = jwt.sign({username : decode.username ,  role : decode.role},process.env.REFRESH_SECRET_KEY,{expiresIn : '1 days'})
    res.cookie('accessToken',newAccesToken,{
      httpOnly: true,
      secure: false, // Gunakan HTTPS di production
      sameSite: 'Strict'
    })
    res.cookie('refreshToken',newRefreshToken,{
        httpOnly: true,
        secure: false, // Gunakan HTTPS di production
        sameSite: 'Strict'
    })

    return res.status(200).json({
            status : 'success',
            statusCode : 200,
            timestmp : new Date(),
            message : "generate new acces token Success",
            data :{
                accessToken : newAccesToken,
                // refreshToken : generateRefreshToken,
                // expiresIn : expiresIn,
                // expiresAt: expirationDate.toISOString() // ISO string format
            }
    })
  }catch(err){
    console.log(err)
  }

}


module.exports = {userLoginController,generateNewAccessToken}