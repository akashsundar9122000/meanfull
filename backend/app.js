const path = require('path');
const express = require('express');
const bodyParser=require('body-parser');

const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');

const mongoose = require('mongoose');
const app = express();

mongoose.connect("mongodb+srv://akash:"+process.env.MONGO_ATLAS_PW+"@cluster0.bqyeu.mongodb.net/node-angular?retryWrites=true&w=majority")
  .then(()=>{
    console.log("Success");
  })
  .catch((err)=>{
    console.log(err);
  })
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use("/images",express.static(path.join("backend/images")));

app.use((req,res,next)=>{

  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, OPTIONS, DELETE, PUT");
  next();
})

app.use("/api/posts",postRoutes);
app.use("/api/user",userRoutes);

module.exports = app;
