const mongoose = require('mongoose');

export async function connect() {
    try{
         mongoose.connect(process.env.MONGO_URI!);
         const connection = mongoose.connection;

         connection.on('connected', ()=>{
            console.log('MongoDb connected');
         });

         connection.on('error', (err: any)=>{
            console.log('MongoDb connection error', err);
         });
    }catch(error){
        console.log("Something goes wrong");
        console.log(error);
    }
}