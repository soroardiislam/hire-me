
import mongoose from 'mongoose';
import { config } from './config.js';

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(config.MONGO_URI);
        console.log(`[CORE] MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`[CORE] Database Error: ${error.message}`);
        process.exit(1);
    }
};