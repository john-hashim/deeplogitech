const express=require("express");
const app=express();

const timesapi=require("./timeapi");

const port =3000;

app.use('/timesapi',timesapi);

app.get("/",(req,res)=>{
    res.send("invalid end point");
})

app.listen(port,()=>{
    console.log("server start on "+3000);
})