"use server";
import mongoose from 'mongoose';

export async function connectDB() {
    try {
        await mongoose.connect(process.env.SERVER_URL as string, {
            ssl: true, // Enable SSL connection
            authSource: 'admin', // Authentication database
            readPreference: 'primaryPreferred', // Read preference
            connectTimeoutMS: 10000, // Connection timeout in milliseconds
            socketTimeoutMS: 45000, // Socket timeout in milliseconds
        });
        console.log('Database connected successfully');
    } catch (err) {
        console.error('Database connection error:', err);
        process.exit(1); // Exit the process with failure
    }
} 