import { Express, Request, Response } from "express";
import { createUserSessionHandler } from "./controller/session.controller";
import { createUserHandler } from "./controller/user.controller";
import requireUser from "./middleware/requireUser";
import validateResource from "./middleware/validateResource";
import { createSessionSchema } from "./schema/session.schema";
import { createUserSchema } from "./schema/user.schema";
import { createMessageSchema } from "./schema/message.schema";
import { createMessageHandler, getMessagesHandler } from "./controller/message.controller";
import cors from "cors";

function routes(app: Express) {
  // Pode ser ignorado, configuração do CORS.
  app.use(cors({
    origin: "http://localhost:4200",
    credentials: true
  }));

  // Endpoint utilizado para verificar se a api está responsiva.
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  // Aqui dizemos que terá dois handlers, o handler de "validateResources", que valida
  // o que foi passado para api, utilizando o ZOD. E o handler que criará o usuário
  app.post("/api/users", validateResource(createUserSchema), createUserHandler);

  app.post("/api/sessions", validateResource(createSessionSchema), createUserSessionHandler);

  // Aqui nós dizemos que além de validar o input, o accessToken é obrigatório e deve ser valido.
  app.post("/api/messages", [requireUser, validateResource(createMessageSchema)], createMessageHandler);

  app.get("/api/messages", requireUser, getMessagesHandler);
}

export default routes;
