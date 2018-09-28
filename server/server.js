const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt  = require('bcrypt');
const {User} = require('./models/user');
const app = express();
const cookieParser = require('cookie-parser');
const {auth} = require('./middleware/auth');

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());

//Connecting mongodb with mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/auth');

 //Routes
 app.post('/api/user',(req,res)=>{
     const user = new User({
         email: req.body.email,
         password: req.body.password
     });

     user.save((err,doc)=>{
         if(err) res.status(400).send(err)
         res.status(200).send(doc)
     })
 })

 app.post('/api/user/login',(req,res)=>{
     User.findOne({'email':req.body.email},(err,user)=>{
         if(!user) res.json({message:'Auth failed, user not found'})
         user.comparePassword(req.body.password,(err,isMatched)=>{
             if(err) throw err;
             if (!isMatched) return res.status(400).json({
                 message: 'Wrong password'
             });
             
             user.generateToken((err,user)=>{
                 if(err) return res.status(400).send(err);
                 res.cookie('auth',user.token).send('Cookie gayo hai')
             })           
         })
     })
 })

 app.post('/api/user/logind',(req,res)=>{
     User.findOne({'email':req.body.email},(err,user)=>{
     if (!user) res.json({message:'User not found'});
     bcrypt.compare(req.body.password,user.password,(err,isMatched)=>{
         if(err) throw err;
         res.status(200).send(isMatched)
     })
 })
})

app.get('/user/profile',auth,(req,res)=>{
    res.status(200).send(req.token)
})



const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Listening to port ${port}`)
})