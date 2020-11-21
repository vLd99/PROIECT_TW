import bodyParser from "body-parser";
import bodyparser from "body-parser";
import cors from "cors";
import express from "express";


var app=express();
var router=express.Router();

app.use(bodyparser.urlencoded({urlencoded:true}))
app.use(bodyParser.json())
app.use(cors())
app.use("/api",router);

router.use((req,res,next)=>{
    console.log("Hello form middleware");
    next();
})

export {app,router}

