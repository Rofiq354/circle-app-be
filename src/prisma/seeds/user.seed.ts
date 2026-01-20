import { PrismaClient } from "@prisma/client";

export async function seedUsers(prisma: PrismaClient) {
  const users = await prisma.user.createMany({
    data: [
      {
        username: "ainur",
        fullname: "Ainur Rofiq",
        email: "ainur@mail.com",
        password: "hashed_password_1",
        bio: "Frontend Developer",
        photo_profile: "ainur.jpg",
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
