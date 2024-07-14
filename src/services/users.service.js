import prisma from "../../prisma/index.js";
import argon2 from "argon2";

const findAll = async () => {
  const users = await prisma.user.findMany();

  return users;
};

const findById = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return user;
};

const findByEmail = async (email) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
};

const create = async ({ email, password }) => {
  const user = await findByEmail(email);

  if (user) {
    throw new Error("User already exists");
  }

  const hashedPassword = await argon2.hash(password);

  const newUser = await prisma.user.create({
    data: { email, password: hashedPassword },
  });

  return newUser;
};

const update = async ({ email, password }) => {
  const user = await findByEmail(email);

  if (user) {
    await argon2.verify(user.password, password);

    const hashedPassword = await argon2.hash(password);

    const updatedUser = await prisma.user.update({
      where: { email },
      data: { email, password: hashedPassword },
    });

    return updatedUser;
  }
};

const remove = async (id) => {
  const user = await prisma.user.delete({ where: { id } });

  return user;
};

const UserService = {
  findAll,
  findById,
  findByEmail,
  create,
  update,
  remove,
};

export default UserService;
