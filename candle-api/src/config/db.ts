import mongoose from "mongoose";
import sanitizedConfig from "../../cofig";

export const connectToMongo = async () => {
    await mongoose.connect(sanitizedConfig.MONGO_URI);
}