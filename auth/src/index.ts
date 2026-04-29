import express from "express";
import { errorHandler } from "./middlewares/error-handler";
import mongoose from "mongoose";
import cookieSession from "cookie-session"

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { NotFoundError } from './errors/not-found-error';

const app = express()
app.set('trust proxy',true) // to let express that its behind the proxy of ingress engine x
app.use(express.json())
app.use(
    cookieSession({
        signed:false,
        secure:true, // for https only
    })
)

app.get("/api/users/currentuser",(req,res)=>{
    res.send("Hi there!") 
})

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

// app.use('/*', async (req, res) => {
//     console.log("not found")
//   throw new NotFoundError();ß
// });

// app.use(async (req, res) => {
//   console.log("not found");
//   throw new NotFoundError();
// }); // this code wass causing 502 bad gateway remove the password from response

app.use((req, res, next) => {
  next(new NotFoundError());
});


app.use(errorHandler);

const start=async()=>{
    if(!process.env.JWT_KEY){
        throw new Error("JWT_KEY is not defined")
    }
    try {
        await mongoose.connect("mongodb://auth-mongo-srv:27017/auth") //creating a new db called authß
        console.log("connected to mongodb")
    } catch (error) {
        console.error("error in db connection",error)
        
    }
    
    app.listen(3000,()=>{
        console.log("auth listen on 3000!!!!!")
    })
}
 start()
