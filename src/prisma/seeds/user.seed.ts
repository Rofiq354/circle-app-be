import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../../utils/hash";

export async function seedUsers(prisma: PrismaClient) {
  const pwHash1 = await hashPassword("Ainur#123");
  const pwHash2 = await hashPassword("Siti#123");
  const pwHash3 = await hashPassword("Budi#123");
  const users = await prisma.user.createMany({
    data: [
      {
        username: "ainur",
        fullname: "Ainur Rofiq",
        email: "ainur@mail.com",
        password: pwHash1,
        bio: "Frontend Developer",
        photo_profile: "http://localhost:3003/public/images/me.jpg",
        cover_photo: "http://localhost:3003/public/images/cover_photo.jpg",
      },
      {
        username: "budi",
        fullname: "Budi Santoso",
        email: "budi@mail.com",
        password: pwHash3,
        bio: "Backend Engineer",
        photo_profile: "http://localhost:3003/public/images/user3.jpg",
      },
      {
        username: "siti",
        fullname: "Siti Aminah",
        email: "siti@mail.com",
        password: pwHash2,
        bio: "UI/UX Designer",
        photo_profile: "http://localhost:3003/public/images/user2.jpg",
      },
    ],
  });

  return users;
}
