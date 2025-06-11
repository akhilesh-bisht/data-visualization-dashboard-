import mongoose from 'mongoose';

export const connectDB = async () => {
    try{
        const connectionDb = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,  
        });
        if(connectionDb) {
            console.log('MongoDB connected successfully');
        }
}catch (error) {    
        console.error('MongoDB connection failed:', error.message);
        process.exit(1); 
    }
}