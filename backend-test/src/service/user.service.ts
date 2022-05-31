import { FilterQuery } from "mongoose";
import { omit } from "lodash";
import UserModel, { UserDocument, UserInput } from "../models/user.model";

export async function createUser(input: UserInput) {
    // Chamada do model do usuário para criação do mesmo.
    const user = await UserModel.create(input);

    // Retornamos o usuário omitindo a senha.
    return omit(user.toJSON(), "password");
}

// Função utilizada para validar o login do usuário, validando a hash da senha.
export async function validatePassword({ email, password }: { email: string; password: string }) {
  // Buscamos o usuário a partir do email
  const user = await UserModel.findOne({ email });

  // Caso ele não exista, a validação obviamente retorna falso.
  if (!user) {
    return false;
  }

  // Depois verificamos se a senha do usuário é a mesma que foi inserida na tentativa de login
  const isValid = await user.comparePassword(password);

  if (!isValid) return false;

  return omit(user.toJSON(), "password");
}

export async function findUser(query: FilterQuery<UserDocument>) {
  return UserModel.findOne(query).lean();
}
