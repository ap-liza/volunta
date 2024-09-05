import mongoose from "mongoose";

export async function connect(){
    try{
        mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection

        connection.on('connected', ()=>{
            console.log('MongoDB connected successfully')
        })

        connection.on('error', (err)=>{
            console.log('Connection error has occured. ', + err)
            process.exit()
        })
    } catch(error){
        console.log('Error')
        console.log(error)
    }
}