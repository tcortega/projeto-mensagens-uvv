import { get } from "lodash";
import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt.utils";
import { reIssueAccessToken } from "../service/session.service";

// Middleware utilizado para recuperar um usuário baseado no token que é passado na requisição
const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = get(req, "headers.authorization", "").replace(/^Bearer\s/, "");

  const refreshToken = get(req, "headers.x-refresh");

  // Se o token não existe, ele desiste do processo de deserialização e apenas avança para o próximo "middleware"
  if (!accessToken) {
    return next();
  }

  // Decodifica o JWT pasasdo
  const { decoded, expired } = verifyJwt(accessToken, "accessTokenPublicKey");

  if (decoded) {
    // Armazena o usuário decodificado.
    res.locals.user = decoded;
    return next();
  }

  // Caso não tenha conseguido decodificar, ele verifica se o token expirou, e se foi passado o refresh token na requisição
  if (expired && refreshToken) {
    // Cria novo token pois o antigo expirou
    const newAccessToken = await reIssueAccessToken({ refreshToken });

    // altera valor do header de accessToken para persistir o novo token pro usuário
    if (newAccessToken) {
      res.setHeader("x-access-token", newAccessToken);
    }

    // Decodifica o novo token
    const result = verifyJwt(newAccessToken as string, "accessTokenPublicKey");

    res.locals.user = result.decoded;
    return next();
  }

  return next();
};

export default deserializeUser;
