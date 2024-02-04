import mongoose from "mongoose";

const MONGO_URL = "mongodb://localhost/project";

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Connected to MongoDB.");
    } catch (error) {
        console.log(error);
    }
};
