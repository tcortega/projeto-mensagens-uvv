import logger from "pino";
import dayjs from "dayjs";

// Logger criado utilizando o pino
// Para aprender mais veja: https://www.npmjs.com/package/pino
const log = logger({
  prettyPrint: true,
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default log;
