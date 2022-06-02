import { Request, Response, NextFunction } from "express";

// Função utilizada a para dizer que é obrigatório passar um accessToken para realizar a requisição
const requireUser = (req: Request, res: Response, next: NextFunction) => {
  // Caso não foi passado o usuário ou um usuário válido, retorna Forbidden
  if (!res.locals.user) {
    return res.sendStatus(403);
  }

  return next();
};

export default requireUser;
