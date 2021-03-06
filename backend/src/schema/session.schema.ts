import { object, string } from "zod";

// Schema, utilizado para validação utilizando zod
export const createSessionSchema = object({
  body: object({
    email: string({
      required_error: "O email é obrigatório",
    }),
    password: string({
      required_error: "A senha é obrigatória",
    }),
  }),
});
