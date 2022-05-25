import { Express, Request, Response } from "express";
import { createUserSessionHandler, getUserSessionsHandler, deleteSessionHandler } from "./controller/session.controller";
import { createUserHandler } from "./controller/user.controller";
import requireUser from "./middleware/requireUser";
import validateResource from "./middleware/validateResource";
import { createSessionSchema } from "./schema/session.schema";
import { createUserSchema } from "./schema/user.schema";
import { createMessageSchema } from "./schema/message.schema";
import { createMessageHandler, getMessagesHandler } from "./controller/message.controller";
import cors from "cors";

function routes(app: Express) {
  app.use(cors({
    origin: "http://localhost:4200",
    credentials: true
  }));

  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  app.post("/api/users", validateResource(createUserSchema), createUserHandler);

  app.post("/api/sessions", validateResource(createSessionSchema), createUserSessionHandler);

  app.get("/api/sessions", requireUser, getUserSessionsHandler);

  app.delete("/api/sessions", requireUser, deleteSessionHandler);

  app.post("/api/messages", [requireUser, validateResource(createMessageSchema)], createMessageHandler);

  app.get("/api/messages", requireUser, getMessagesHandler);
}

export default routes;
