import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../../utils/hash";

export async function seedUsers(prisma: PrismaClient) {
  const pwHash = await hashPassword("hashed_password_1");
  const users = await prisma.user.createMany({
    data: [
      {
        username: "ainur",
        fullname: "Ainur Rofiq",
        email: "ainur@mail.com",
        password: pwHash,
        bio: "Frontend Developer",
        photo_profile: "http://localhost:3003/public/images/me.jpg",
        cover_photo: "http://localhost:3003/public/images/cover_photo.jpg",
      },
      {
        username: "budi",
        fullname: "Budi Santoso",
        email: "budi@mail.com",
        password: "hashed_password_2",
        bio: "Backend Engineer",
        photo_profile: "budi.jpg",
      },
      {
        username: "siti",
        fullname: "Siti Aminah",
        email: "siti@mail.com",
        password: "hashed_password_3",
        bio: "UI/UX Designer",
        photo_profile: "siti.jpg",
      },
    ],
  });

  return users;
}
