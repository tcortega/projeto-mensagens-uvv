import { Request, Response } from "express";
import config from "config";
import { createSession } from "../service/session.service";
import { validatePassword } from "../service/user.service";
import { signJwt } from "../utils/jwt.utils";

// Função usada para logar um usuário
// POST api/sessions
export async function createUserSessionHandler(req: Request, res: Response) {
  // Valida a senha do usuário baseado na senha armazenada no banco
  const user = await validatePassword(req.body);

  // Se não encontrou o usuário, retorna que tem algo de errado
  if (!user) {
    return res.status(401).send([{message: "Senha ou email inválidos"}]);
  }

  // Cria uma sessão para o usuário e armazena no banco
  const session = await createSession(user._id, req.get("user-agent") || "");

  // Cria o access token JWT
  const accessToken = signJwt(
    { ...user, session: session._id },
    "accessTokenPrivateKey",
    { expiresIn: config.get("accessTokenTtl") } // 30 minutos,
  );

  // Cria o refresh token JWT
  const refreshToken = signJwt(
    { ...user, session: session._id },
    "refreshTokenPrivateKey",
    { expiresIn: config.get("refreshTokenTtl") } // 30 minutos
  );

  // Retorna o access e o refresh token criados para o usuário utilizar em
  // requisições que necessitam de autenticação
  return res.send({ accessToken, refreshToken });
}
