import mongoose from "mongoose";
import { UserDocument } from "./user.model";

// Interface da Mensagem que é passada para a API
export interface MessageInput {
  user: UserDocument["_id"];
  content: string;
}

// Documento, que extende o input e adiciona campos de data.
export interface MessageDocument extends MessageInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

// Schema
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
