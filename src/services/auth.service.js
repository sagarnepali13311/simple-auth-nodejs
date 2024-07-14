import argon2 from "argon2";
import UserService from "./users.service.js";

const login = async ({ email, password }) => {
  const user = await UserService.findByEmail(email);

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordCorrect = await argon2.verify(user.password, password);

  if (isPasswordCorrect) {
    return user;
  }

  throw new Error("Invalid Password");
};

const register = async ({ email, password }) => {
  const user = await UserService.create({ email, password });

  return user;
};

const AuthService = {
  login,
  register,
};

export default AuthService;
