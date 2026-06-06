import { prisma } from "../client";
import { Role } from "@prisma/client";

export async function findUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
  });
}

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function createUser(data: {
  email: string;
  passwordHash?: string;
  role?: Role;
}) {
  return prisma.user.create({
    data: {
      email: data.email,
      passwordHash: data.passwordHash,
      role: data.role || Role.USER,
    },
  });
}

export async function updateUser(id: string, data: {
  passwordHash?: string;
  role?: Role;
}) {
  return prisma.user.update({
    where: { id },
    data: {
      passwordHash: data.passwordHash,
      role: data.role,
    },
  });
}