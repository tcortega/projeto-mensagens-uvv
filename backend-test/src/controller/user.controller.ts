import { Request, Response } from "express";
import { omit } from "lodash";
import { CreateUserInput } from "../schema/user.schema";
import { createUser } from "../service/user.service";

// Utilizamos essa função para cadastrar um usuário
export async function createUserHandler(req: Request<{}, {}, CreateUserInput["body"]>, res: Response) {
  try {
    // Chamada da função da camada de serviço
    const user = await createUser(req.body);
    // Retornamos o usuário criado, e escondemos a senha, pois a senha que armazenamos é uma HASH
    // O método Omit vem da biblioteca lodash. Caso queira aprender mais leia:
    // https://lodash.com/
    return res.send(omit(user, "password"));
  } catch (e: any) {
    // Caso a api de um erro na hora de salvar o usuário, consideramos que o erro significa
    // que o email já foi cadastrado. Não é a melhor prática possível porém quem liga?
    return res.status(409).send({error: [{message: "Email já cadastrado"}]});
  }
}
