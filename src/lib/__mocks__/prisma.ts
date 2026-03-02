import { PrismaClient } from "@prisma/client";
import { mockDeep, DeepMockProxy } from "jest-mock-extended";

export const prismaMock =
  mockDeep<PrismaClient>() as unknown as DeepMockProxy<PrismaClient>;

jest.mock("../../prisma/prismaClient", () => ({
  __esModule: true,
  prisma: prismaMock,
}));
