const jwt = require('jsonwebtoken')
require('dotenv').config()


const verifyToken = async(req,res,next)=>{
    const accessToken = req.cookies['accessToken'] // get acces token from cookies 

    if(!accessToken){
      return res.status(401).json({ 
        status : 'failed',
        statusCode : 401,
        error : {
          message: 'Access token required'
        }

      });
    }

    try{
        const decode = jwt.verify(accessToken,process.env.SECRET_KEY)
        next();

    }catch(err){
        if(err.name == 'TokenExpiredError'){
          return res.status(403).json({
            status : 'failed',
            statusCOde : '401',
            error : {
                message : 'Token has expired',
                expiredAt : err.expiredAt
            }
        })
        }
    }
  
}




module.exports = {verifyToken};