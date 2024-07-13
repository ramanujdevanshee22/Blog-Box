import mongoose from "mongoose";

export async function connect (){
    try{
        mongoose.connect(process.env.MONGODB_URL,{
           
        });
        const connection = mongoose.connection;

        connection.on('connected',()=>{
            console.log('Database connected successfully💡');
        })

        connection.on('error', (err)=>{
            console.log('MongoDB connection error 🚩');
            process.exit();
        })
    }
    catch(error){
        console.log('Something goes wrong!');
        console.log(error);
    }
}