import mongoose from "mongoose";
import { app } from "./app";


const start=async()=>{
    if(!process.env.JWT_KEY){
        throw new Error("JWT_KEY is not defined")
    }
    if(!process.env.MONGO_URI){
        throw new Error("MONGO_URI is not defined")
    }
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connected to mongodb")
    } catch (error) {
        console.error("error in db connection",error)
        
    }
    
    app.listen(3000,()=>{
        console.log("auth listen on 3000!!!!!")
    })
}
 start()
