import mongoose from "mongoose";
import config from "config";
import logger from "./logger";

async function connect() {
  const dbUri = config.get<string>("dbUri");

  try {
    await mongoose.connect(dbUri);
    logger.info("Banco de dados conectado com sucesso");
  } catch (error) {
    logger.error("Não foi possível se conectar ao banco de dados");
    process.exit(1);
  }
}

export default connect;
