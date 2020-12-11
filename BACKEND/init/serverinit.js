import bodyParser from "body-parser";
import cors from "cors";
import express from "express";


var app=express();
var router=express.Router();

app.use(bodyParser.urlencoded({urlencoded:true}))
app.use(bodyParser.json())
app.use(cors())
app.use("/api",router);

router.use((req,res,next)=>{
    console.log("Hello form middleware");
    next();
})

export {app,router}

