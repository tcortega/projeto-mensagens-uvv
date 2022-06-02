import { get } from "lodash";
import config from "config";
import { FilterQuery, UpdateQuery } from "mongoose";
import SessionModel, { SessionDocument } from "../models/session.model";
import { verifyJwt, signJwt } from "../utils/jwt.utils";
import { findUser } from "./user.service";

// Função utilizada para a persistência da sessão do usuário.
export async function createSession(userId: string, userAgent: string) {
  const session = await SessionModel.create({ user: userId, userAgent });

  return session.toJSON();
}

// Método para gerar novo accessToken a partir do refreshToken.
// Para aprender mais, pesquise sobre JWT.
export async function reIssueAccessToken({ refreshToken }: { refreshToken: string }) {
  const { decoded } = verifyJwt(refreshToken, "refreshTokenPublicKey");

  if (!decoded || !get(decoded, "session")) return false;

  const session = await SessionModel.findById(get(decoded, "session"));

  if (!session || !session.valid) return false;

  const user = await findUser({ _id: session.user });

  if (!user) return false;

  const accessToken = signJwt(
    { ...user, session: session._id },
    "accessTokenPrivateKey",
    { expiresIn: config.get("accessTokenTtl") } // 15 minutes
  );

  return accessToken;
}
