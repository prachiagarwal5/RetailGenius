const mongoose=require('mongoose');
require('dotenv').config();

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            dbName: process.env.DB_NAME,
    });
        console.log('MongoDB connected successfully');
}
    catch(err){
        console.error('MongoDB connection failed:', err.message);
        
    }
}