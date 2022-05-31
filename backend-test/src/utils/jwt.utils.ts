import jwt from "jsonwebtoken";
import config from "config";

// Função utilizada para assinar sessões, gerando tokens de autenticação JWT
export function signJwt(object: Object, keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey", options?: jwt.SignOptions | undefined) {
  // Recuperamos a key de assinatura que está armazenada nas configs do projeto
  // foi salva utilizando codificação BASE64s
  const signingKey = Buffer.from(config.get<string>(keyName), "base64").toString("ascii");

  // Assina utilizando a biblioteca do JWT
  return jwt.sign(object, signingKey, {
    ...(options && options),
    algorithm: "RS256",
  });
}

// Função utilizada para validar os tokens de autenticação que são passados para a API
// Assim sabemos que eles realmente são válidos e que são nossos.
export function verifyJwt(token: string, keyName: "accessTokenPublicKey" | "refreshTokenPublicKey") {
  // A key do jwt que fica salva nas config em formato BASE64
  const publicKey = Buffer.from(config.get<string>(keyName), "base64").toString("ascii");

  try {
    // Aqui nós verificamos se o token é válido e gerado por nós mesmos.

    // Caso seja válido, retornamos que é, caso contrário, retornamos que não é.
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    console.error(e);
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }
}
