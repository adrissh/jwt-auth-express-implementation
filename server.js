const express = require('express')
const app = express()
const port = 3000;
const cookieParser = require('cookie-parser')


const authRoutes = require('./routes/auth')
const {verifyToken,authorize} = require('./middleware/auth/authenticate')

app.use(cookieParser());
app.use('/api/auth',authRoutes);

app.get('/protected', verifyToken, (req, res) => {
    res.send('This is a protected route');
  });


app.get('/admin', verifyToken, authorize(['admin']), (req, res) => {
  res.send(`This is page Admin, Welcome ${req.user.username}`);
});
app.get('/guest', verifyToken, authorize(['guest','admin']), (req, res) => {
  res.send(`This is page Admin + Guest, Welcome ${req.user.username}`);
});




app.listen(port,()=>{
    console.log(`Server Running on port : ${port}`)
})