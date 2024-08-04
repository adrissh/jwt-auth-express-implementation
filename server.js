const express = require('express')
const app = express()
const port = 3000;
const cookieParser = require('cookie-parser')


const authRoutes = require('./routes/auth')
const {verifyToken} = require('./middleware/authenticateToken')

app.use(cookieParser());
app.use('/api/auth',authRoutes);

app.get('/protected', verifyToken, (req, res) => {
    res.send('This is a protected route');
  });



app.listen(port,()=>{
    console.log(`Server Running on port : ${port}`)
})