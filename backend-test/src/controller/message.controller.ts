import { Request, Response } from "express";
import { CreateMessageInput } from "../schema/message.schema";
import { createMessage, listMessages } from "../service/message.service";
import config from "config";
import Pusher from "pusher";

const pusher = new Pusher({
  appId: config.get<string>("pusherAppId"),
  key: config.get<string>("pusherKey"),
  secret: config.get<string>("pusherSecret"),
  cluster: config.get<string>("pusherCluster"),
});

export async function createMessageHandler(req: Request<{}, {}, CreateMessageInput["body"]>, res: Response) {
  const userId = res.locals.user._id;
  const message = await createMessage({ ...req.body, user: userId });

  pusher.trigger("chat", "new_message", { content: message.content, user: res.locals.user.name, createdAt: message.createdAt });

  return res.status(201).send(message);
}

export async function getMessagesHandler(req: Request, res: Response) {
  const messages = await listMessages();

  return res.send(messages);
}
