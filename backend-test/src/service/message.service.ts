import MessageModel, { MessageInput } from "./../models/message.model";

export async function createMessage(input: MessageInput) {
  const message = await MessageModel.create(input);
  return message;
}

export async function listMessages() {
  return await MessageModel.find();
}

// export async function listMessages()

// export async function createProduct(input: ProductInput) {
//   const metricsLabels = {
//     operation: "createProduct",
//   };

//   try {
//     const result = await ProductModel.create(input);
//     timer({ ...metricsLabels, success: "true" });
//     return result;
//   } catch (e) {
//     timer({ ...metricsLabels, success: "false" });
//     throw e;
//   }
// }

// export async function findProduct(query: FilterQuery<ProductDocument>, options: QueryOptions = { lean: true }) {
//   const metricsLabels = {
//     operation: "findProduct",
//   };

//   const timer = databaseResponseTimeHistogram.startTimer();
//   try {
//     const result = await ProductModel.findOne(query, {}, options);
//     timer({ ...metricsLabels, success: "true" });
//     return result;
//   } catch (e) {
//     timer({ ...metricsLabels, success: "false" });

//     throw e;
//   }
// }

// export async function findAndUpdateProduct(query: FilterQuery<ProductDocument>, update: UpdateQuery<ProductDocument>, options: QueryOptions) {
//   return ProductModel.findOneAndUpdate(query, update, options);
// }

// export async function deleteProduct(query: FilterQuery<ProductDocument>) {
//   return ProductModel.deleteOne(query);
// }
