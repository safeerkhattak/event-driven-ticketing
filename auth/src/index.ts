import express from "express";
import { errorHanlder } from "./middlewares/error-handler";

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';


const app = express()
app.use(express.json())

app.get("/api/users/currentuser",(req,res)=>{
    res.send("Hi there!")
})

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.use(errorHanlder);

app.listen(3000,()=>{
    console.log("auth listen on 3000!!!!!")
})

