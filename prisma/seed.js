import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany({});

  await prisma.user.create({
    data: {
      email: "ram@example.com",
      password: await argon2.hash("ram"),
    },
  });

  await prisma.user.create({
    data: {
      email: "shyam@example.com",
      password: await argon2.hash("shyam"),
    },
  });

  await prisma.user.create({
    data: {
      email: "hari@example.com",
      password: await argon2.hash("hari"),
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
