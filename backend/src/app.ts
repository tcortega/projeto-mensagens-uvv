import express from "express";
import config from "config";
import connect from "./utils/connect";
import logger from "./utils/logger";
import routes from "./routes";
import deserializeUser from "./middleware/deserializeUser";

// Recupera porta das configurações
const port = config.get<number>("port");

const app = express();

app.use(express.json());

// Passa middleware de deserialização do usuário.
// ATENÇÃO: A ORDEM USADA AQUI PARA PASSAR OS MIDDLEWARES É IMPORTANTE POIS É A ORDEM EM QUE O REQUEST SERÁ PROCESSADO.
app.use(deserializeUser);

app.listen(port, async () => {
  await connect();
  logger.info(`Api esta rodando em http://localhost:${port}`);
  
  // Diz as rotas da api
  routes(app);
});
