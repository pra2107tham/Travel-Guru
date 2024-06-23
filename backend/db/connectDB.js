import mongoose, { connect } from "mongoose";

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URI}/travel-guru`)
        if(!connection){
            console.log("Database connection failed")
        }
        console.log("Database connection success")
    } catch (error) {
        console.log("Database connection failed with error :", error);
    }
}

export default connectDB