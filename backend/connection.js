import mongoose from 'mongoose';

const connectMongoDB = async (url) => {
    try {
        await mongoose.connect(url);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error('MongoDB connection error', error);
        process.exit(1);
    }
};

export default connectMongoDB;
