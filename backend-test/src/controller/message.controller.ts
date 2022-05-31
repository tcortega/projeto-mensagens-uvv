import { Request, Response } from "express";
import { CreateMessageInput } from "../schema/message.schema";
import { createMessage, listMessages } from "../service/message.service";
import config from "config";
import Pusher from "pusher";

// Criamos aqui uma instância do pusher. Utilizado como serviço tempo-real de troca de mensagens
// https://pusher.com/
const pusher = new Pusher({
  appId: config.get<string>("pusherAppId"),
  key: config.get<string>("pusherKey"),
  secret: config.get<string>("pusherSecret"),
  cluster: config.get<string>("pusherCluster"),
});

// Function utilizada para criar mensagens.
// POST api/messages
export async function createMessageHandler(req: Request<{}, {}, CreateMessageInput["body"]>, res: Response) {
  // Recupera o usuário anteriormente serializado pelos middlewares
  const userId = res.locals.user._id;
  // Cria uam nova mensagem chamando o serviço de mensagens e armazena a mesma no banco.
  const message = await createMessage({ ...req.body, user: userId });

  // Envia mensagem para o canal do pusher, para que todas pessoas conectadas recebam
  pusher.trigger("chat", "new_message", { content: message.content, user: res.locals.user.name, createdAt: message.createdAt });

  // Retorna HTTP 201 e a mensagem criada com sucesso.
  return res.status(201).send(message);
}

// Function utilizada para recuperar mensagens.
// GET api/messages
export async function getMessagesHandler(req: Request, res: Response) {
  // Chama função da camada de serviços para listar mensagens.
  const messages = await listMessages();

  // Retorna mensagens com STATUS 200 que é o padrão.
  return res.send(messages);
}
