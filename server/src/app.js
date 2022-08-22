const path=require('path');
const express = require('express');
const cors=require('cors');
const morgan=require('morgan');

const app = express();

const api=require('./routes/api');

// morgan is a logging middleware
app.use(morgan('combined'));

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(express.static(path.join(__dirname,'..','public')))

app.use('/v1',api);


//astres is used to allow react to redirect routes that is not handled by the express router
app.get('/*',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','public','index.html'))
})

module.exports=app;