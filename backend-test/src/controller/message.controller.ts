import { Request, Response } from "express";
import { CreateMessageInput } from "../schema/message.schema";
import { createMessage, listMessages } from "../service/message.service";

export async function createMessageHandler(req: Request<{}, {}, CreateMessageInput["body"]>, res: Response) {
  const userId = res.locals.user._id;
  const message = await createMessage({ ...req.body, user: userId });

  return res.status(201).send(message);
}

export async function listMessagesHandler(req: Request, res: Response) {
  const messages = await listMessages();
  return res.send(messages);
}

// export async function createProductHandler(req: Request<{}, {}, CreateProductInput["body"]>, res: Response) {
//   const userId = res.locals.user._id;

//   const body = req.body;

//   const product = await createProduct({ ...body, user: userId });

//   return res.send(product);
// }

// export async function updateProductHandler(req: Request<UpdateProductInput["params"]>, res: Response) {
//   const userId = res.locals.user._id;

//   const productId = req.params.productId;
//   const update = req.body;

//   const product = await findProduct({ productId });

//   if (!product) {
//     return res.sendStatus(404);
//   }

//   if (String(product.user) !== userId) {
//     return res.sendStatus(403);
//   }

//   const updatedProduct = await findAndUpdateProduct({ productId }, update, {
//     new: true,
//   });

//   return res.send(updatedProduct);
// }

// export async function getProductHandler(req: Request<UpdateProductInput["params"]>, res: Response) {
//   const productId = req.params.productId;
//   const product = await findProduct({ productId });

//   if (!product) {
//     return res.sendStatus(404);
//   }

//   return res.send(product);
// }

// export async function deleteProductHandler(req: Request<UpdateProductInput["params"]>, res: Response) {
//   const userId = res.locals.user._id;
//   const productId = req.params.productId;

//   const product = await findProduct({ productId });

//   if (!product) {
//     return res.sendStatus(404);
//   }

//   if (String(product.user) !== userId) {
//     return res.sendStatus(403);
//   }

//   await deleteProduct({ productId });

//   return res.sendStatus(200);
// }
