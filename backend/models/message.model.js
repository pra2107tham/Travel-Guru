import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender:{
        type: String, // 'user' or 'bot'
        required: true
    },
    message :{
        type: String,
        required: true
    },
}, {timestamps: true})

const Message = mongoose.model("Message", messageSchema)

export {Message}