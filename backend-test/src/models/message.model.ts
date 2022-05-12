import mongoose from "mongoose";
import { UserDocument } from "./user.model";

export interface MessageInput {
  user: UserDocument["_id"];
  content: string;
}

export interface MessageDocument extends MessageInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const MessageModel = mongoose.model<MessageDocument>("Message", messageSchema);

export default MessageModel;
