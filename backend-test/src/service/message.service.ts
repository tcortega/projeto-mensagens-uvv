import MessageModel, { MessageInput } from "./../models/message.model";
import UserModel from "./../models/user.model";

export async function createMessage(input: MessageInput) {
  // Cria mensagem utilizando o Model e Mongoose
  const message = await MessageModel.create(input);
  return message;
}

export async function listMessages() {
  // Busca todas mensagens
  const messages = await MessageModel.find();
  const returnMessages: { createdAt: Date; content: string; user: string }[] = [];

  // Loop sob todas mensagens para encontrar o usuário e assimilar à uma mensagem
  for(const msg of messages) {
    const user = await UserModel.findOne({ _id: msg.user });

    // Adiciona à array de mensagens que será retornada com os dados relevantes para o frontend.
    // o ! em user!.name é utilizado pois se tem a certeza que o usuário existe. Aprenda mais no link abaixo
    // https://www.logicbig.com/tutorials/misc/typescript/non-null-assertion-operator.html
    returnMessages.push({ createdAt: msg.createdAt, content: msg.content, user: user!.name });
  }

  return returnMessages;
}