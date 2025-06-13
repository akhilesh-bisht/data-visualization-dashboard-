import mongoose from 'mongoose';
import fs from "fs"
import { Data } from '../models/data.model.js';
const rawData = fs.readFileSync(new URL('../jsondata.json', import.meta.url));
const data = JSON.parse(rawData);

export const connectDB = async () => {
    const uri = process.env.MONGO_URI;

    if (!uri) {
        console.error(" MONGO_URI not defined in environment variables.");
        process.exit(1);
    }

    try {
        await mongoose.connect(uri); 
        console.log(' MongoDB connected successfully');

        // Seed the data only if collection is empty
        const count = await Data.countDocuments();
        if (count === 0) {
            await Data.insertMany(data);
            console.log('Sample data seeded into MongoDB');
        } else {
            console.log('Data already exists, skipping seeding');
        }

    } catch (error) {
        console.error(' MongoDB connection failed:', error.message);
        process.exit(1);
    }
};
