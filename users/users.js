
const bcrypt = require('bcryptjs');
// const { user } = require('../routes/auth');
const users = []; // result hash store this array , 


const registerUser = async(username,password,email,role)=>{
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {username,password :hashedPassword,email,role};
    users.push(user)
    return users
    }

const findUserByUsername = (username)=>{    
    return users.find(user => user.username === username)
}


const findRefreshToken = (refreshToken)=>{
    return users.find(user => user.refreshToken === refreshToken)       
}

const pushRefreshToken = (refreshToken)=>{
    const data = {refreshToken : refreshToken}
    users.push(data)
}  

const showData = ()=>{
    const data = users;
    console.log("####################################")
    console.log(data)
}



module.exports = {registerUser,findUserByUsername, findRefreshToken,pushRefreshToken,showData}