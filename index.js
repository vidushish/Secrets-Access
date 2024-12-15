import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

var userIsAurhorised =false;

app.use(bodyParser.urlencoded({extended: true}));

function passwordCheck(req,res,next){
    const password=req.body["password"];
    if(password==="SecretPassword"){
        userIsAurhorised =true;
    }
    next();
}

app.use(passwordCheck);

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/password.html");
});

app.post("/check",(req,res)=>{
    if(userIsAurhorised===true){
        res.sendFile(__dirname + "/secrets.html");
    }
    else{
        res.sendFile(__dirname + "/password.html");
        // res.redirect("/");
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
  