import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

// Interface do usuário que é passado para a api
export interface UserInput {
  email: string;
  name: string;
  password: string;
}

export interface UserDocument extends UserInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<Boolean>;
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// Dizemos que antes de salvar os dados no banco, nós faremos algo.
userSchema.pre("save", async function (next) {
  let user = this as UserDocument;

  // Caso não tenha sido modificada a senha( para casos de update ), nós ignoramos todo o processo.
  if (!user.isModified("password")) {
    return next();
  }

  // Pegamos nossa salt gerada pelo BCrypt.
  const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));

  // Geramos a hash da senha do usuário.
  const hash = await bcrypt.hashSync(user.password, salt);

  // Dizemos que a senha a ser salva é a hash gerada.
  user.password = hash;

  return next();
});

// Função para comparar duas senhas, uma senha salva no banco e uma senha vindo da api.
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  const user = this as UserDocument;

  // É comparado utilizando o bcrypt.
  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
