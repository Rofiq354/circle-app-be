import { prismaMock } from "../lib/__mocks__/prisma";

afterEach(() => {
  prismaMock.following.findMany.mockReset();
});
