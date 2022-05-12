import { object, string, TypeOf } from "zod";

const payload = {
  body: object({
    content: string({
      required_error: "O conteúdo da mensagem é obrigatório",
    }),
  }),
};

const params = {
  params: object({
    messageId: string({
      required_error: "O id da mensagem é obrigatório",
    }),
  }),
};

export const createMessageSchema = object({
  ...payload,
});

export const deleteProductSchema = object({
  ...params,
});

export const getMessageSchema = object({
  ...params,
});

export type CreateMessageInput = TypeOf<typeof createMessageSchema>;
export type ReadMessageInput = TypeOf<typeof getMessageSchema>;
export type DeleteMessageInput = TypeOf<typeof deleteProductSchema>;
