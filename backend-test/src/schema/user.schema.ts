import { object, string, TypeOf } from "zod";

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: "O nome é obrigatório",
    }),
    password: string({
      required_error: "O nome é obrigatório",
    }).min(6, "A senha é muito curta - deve ter no mínimo 6 caracteres"),
    passwordConfirmation: string({
      required_error: "A senha de confirmação é obrigatória",
    }),
    email: string({
      required_error: "O email é obrigatório",
    }).email("Este não é uma email válido"),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "As senhas não conferem",
    path: ["passwordConfirmation"],
  }),
});

export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>, "body.passwordConfirmation">;
