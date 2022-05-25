import MessageModel, { MessageInput } from "./../models/message.model";
import UserModel from "./../models/user.model";

export async function createMessage(input: MessageInput) {
  const message = await MessageModel.create(input);
  return message;
}

export async function listMessages() {
  const messages = await MessageModel.find();
  const returnMessages: { createdAt: Date; content: string; user: string }[] = [];

  for(const msg of messages) {
    const user = await UserModel.findOne({ _id: msg.user });
    returnMessages.push({ createdAt: msg.createdAt, content: msg.content, user: user!.name });
  }

  return returnMessages;
}