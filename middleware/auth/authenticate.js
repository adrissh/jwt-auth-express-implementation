const jwt = require('jsonwebtoken');
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
        req.user = decode
        console.log(`hasil decode acces token => ${JSON.stringify(decode)}`)
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



const authorize = (allowedRoles)=>(req, res, next) => {
  // console.log(`from payload to authorize ${JSON.stringify(req.user.role)}`);

  const payloadRole = req.user.role
  console.log(payloadRole)
  const checkRole = allowedRoles.includes(payloadRole)
  console.log(checkRole)

  if(!checkRole){
    return res.status(403).json({
      error : 'Access denied',
    })
  }else{
    
    next()
  }
};




module.exports = {verifyToken,authorize};