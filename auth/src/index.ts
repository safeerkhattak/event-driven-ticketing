import mongoose from "mongoose";
import { app } from "./app";

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
