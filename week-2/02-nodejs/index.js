require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path')
const app = express();
const port = process.env.PORT;
console.log("first",process.env.PORT)

app.get("/files", function(req,res){
    fs.readdir(path.join(__dirname,'./files/'),(err,files)=>{
        if(err){
            return res.status(500).json({error: 'Failed to retrieve files' })
        }
        return res.status(200).json(files)
    })
})

app.get("/file/:filename",(req,res)=>{
    const filepath= path.join(__dirname,'./files/',req.params.filename)
    fs.readFile(filepath,'utf-8',(err,data)=>{
        if(err){
            res.status(404).send('File not found');
        }
        res.send(data);
    })
})

app.all("*",(req,res)=>{
    res.status(404).send("Route not found");
})


app.listen(port,()=>{
    console.log("Server Running",port)
})

module.exports = app;