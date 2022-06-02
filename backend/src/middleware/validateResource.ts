import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

// Utiliza o ZOD para validar o input passado, é utilizado nas rotas.
// Para aprender mais sobre o ZOD veja: https://www.npmjs.com/package/zod
const validate = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (e: any) {
    return res.status(400).send(e.errors);
  }
};

export default validate;
