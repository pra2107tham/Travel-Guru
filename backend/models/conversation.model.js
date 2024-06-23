import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required : true,
  },
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      default: [],
    },
  ],
}, { timestamps: true });

const Conversation = mongoose.model("Conversation",conversationSchema)

export {Conversation}
