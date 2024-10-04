const request = require('supertest');
const assert = require('assert');
const express = require('express');
const port = 3000;
const app = express();
let requestCount = 0;

app.get('/requestCount', function(req, res) {
    res.send(`Request Count ${requestCount}` );
});

app.use(function(req,res,next){
    requestCount++;
    next();
})

app.get('/user',(req,res)=>{
    console.log("User 1")
    res.status(200).json({name:"john"});
})

app.post('/user',(req,res)=>{
    res.status(200).json({msg:'created dummy user'})
})


app.listen(port,()=>{
    console.log("Server is running")
})

module.exports = app;

function TotalReq(req,res,next){
    console.log("middelware 1 :",requestCount)
    requestCount++;
    console.log("middelware 2",requestCount)
    next();
}