import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectioninstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log(`\nMongo DB connected !!! ${connectioninstance.connection.host}`);
        return true;
    } catch (error) {
        console.log(`Mongo DB connection failed !!!`, error);
        return false;
    }
};

export default connectDB;