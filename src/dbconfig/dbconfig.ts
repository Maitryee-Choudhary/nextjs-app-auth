const mongoose = require('mongoose');

export async function connect() {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI,{
           useNewURLParser: true,
           useUnifiedTopology: true
        });
        console.log("MongoDb connected");
     }catch(e){
         console.log("DB has some error", e);
         
     }
}