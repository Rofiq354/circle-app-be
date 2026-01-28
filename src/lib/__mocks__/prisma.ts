// src/lib/__mocks__/prisma.ts
import { PrismaClient } from "@prisma/client";
import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended";
import { prisma } from "../../prisma/prismaClient";

// Menginstruksikan Jest untuk me-mock file prisma asli
jest.mock("../../prisma/prismaClient", () => ({
  __esModule: true,
  prisma: mockDeep<PrismaClient>(),
}));

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;

// Reset mock setiap kali sebelum tes dijalankan agar tidak ada data sisa
beforeEach(() => {
  mockReset(prismaMock);
});
