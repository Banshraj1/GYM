import express from "express"
const app=express();
app.get('/',(req,res)=>{
    res.send("this is good")
})
app.listen(4000,(req,res)=>{
    console.log("app is listenning ");
    
})