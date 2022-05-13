import express, { Request, Response } from "express";
import config from "config";
import responseTime from "response-time";
import connect from "./utils/connect";
import logger from "./utils/logger";
import routes from "./routes";
import deserializeUser from "./middleware/deserializeUser";

const port = config.get<number>("port");

const app = express();

app.use(express.json());

app.use(deserializeUser);

app.listen(port, async () => {
  await connect();
  logger.info(`Api esta rodando em http://localhost:${port}`);
  
  routes(app);
});
