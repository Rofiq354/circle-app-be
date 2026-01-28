import { PrismaClient } from "@prisma/client";

export async function seedFollows(
  prisma: PrismaClient,
  users: { id: number }[],
) {
  if (users.length < 3) {
    console.error("Not enough users to seed follows");
    return;
  }

  return prisma.following.createMany({
    data: [
      {
        followerId: users[0].id,
        followingId: users[1].id,
      },
      {
        followerId: users[0].id,
        followingId: users[2].id,
      },
      {
        followerId: users[1].id,
        followingId: users[0].id,
      },

      // Ainur (users[0]) - Frontend Dev follows other frontend & designers
      {
        followerId: users[0].id,
        followingId: users[3].id, // Dwi - Full Stack
      },
      {
        followerId: users[0].id,
        followingId: users[6].id, // Linda - UI Designer
      },
      {
        followerId: users[0].id,
        followingId: users[11].id, // Hendra - iOS
      },
      {
        followerId: users[0].id,
        followingId: users[16].id, // Putri - UX
      },
      {
        followerId: users[0].id,
        followingId: users[19].id, // Sarah - Content Creator
      },

      // Budi (users[1]) - Backend Dev follows backend & devops folks
      {
        followerId: users[1].id,
        followingId: users[2].id, // Siti
      },
      {
        followerId: users[1].id,
        followingId: users[5].id, // Agus - DevOps
      },
      {
        followerId: users[1].id,
        followingId: users[7].id, // Fikri - Software Engineer
      },
      {
        followerId: users[1].id,
        followingId: users[9].id, // Reza - Cybersecurity
      },
      {
        followerId: users[1].id,
        followingId: users[13].id, // Fajar - Cloud Engineer
      },
      {
        followerId: users[1].id,
        followingId: users[17].id, // Arif - DBA
      },

      // Siti (users[2]) - UI/UX Designer follows designers & frontend
      {
        followerId: users[2].id,
        followingId: users[0].id, // Ainur
      },
      {
        followerId: users[2].id,
        followingId: users[6].id, // Linda - Product Designer
      },
      {
        followerId: users[2].id,
        followingId: users[10].id, // Dina - PM
      },
      {
        followerId: users[2].id,
        followingId: users[16].id, // Putri - UX Researcher
      },
      {
        followerId: users[2].id,
        followingId: users[19].id, // Sarah - Content Creator
      },

      // Dwi (users[3]) - Full Stack follows everyone
      {
        followerId: users[3].id,
        followingId: users[0].id,
      },
      {
        followerId: users[3].id,
        followingId: users[1].id,
      },
      {
        followerId: users[3].id,
        followingId: users[2].id,
      },
      {
        followerId: users[3].id,
        followingId: users[4].id, // Rahma - Mobile Dev
      },
      {
        followerId: users[3].id,
        followingId: users[5].id, // Agus - DevOps
      },
      {
        followerId: users[3].id,
        followingId: users[7].id, // Fikri
      },
      {
        followerId: users[3].id,
        followingId: users[11].id, // Hendra - iOS
      },
      {
        followerId: users[3].id,
        followingId: users[12].id, // Nova - Android
      },

      // Rahma (users[4]) - Mobile Dev follows mobile & frontend devs
      {
        followerId: users[4].id,
        followingId: users[0].id,
      },
      {
        followerId: users[4].id,
        followingId: users[3].id,
      },
      {
        followerId: users[4].id,
        followingId: users[11].id, // Hendra - iOS
      },
      {
        followerId: users[4].id,
        followingId: users[12].id, // Nova - Android
      },
      {
        followerId: users[4].id,
        followingId: users[15].id, // Yoga - Blockchain
      },

      // Agus (users[5]) - DevOps follows backend, cloud, network folks
      {
        followerId: users[5].id,
        followingId: users[1].id,
      },
      {
        followerId: users[5].id,
        followingId: users[7].id, // Fikri
      },
      {
        followerId: users[5].id,
        followingId: users[9].id, // Reza - Cybersecurity
      },
      {
        followerId: users[5].id,
        followingId: users[13].id, // Fajar - Cloud
      },
      {
        followerId: users[5].id,
        followingId: users[17].id, // Arif - DBA
      },
      {
        followerId: users[5].id,
        followingId: users[21].id, // Andi - Network Engineer
      },

      // Linda (users[6]) - Product Designer follows designers & PMs
      {
        followerId: users[6].id,
        followingId: users[0].id,
      },
      {
        followerId: users[6].id,
        followingId: users[2].id,
      },
      {
        followerId: users[6].id,
        followingId: users[10].id, // Dina - PM
      },
      {
        followerId: users[6].id,
        followingId: users[16].id, // Putri - UX
      },
      {
        followerId: users[6].id,
        followingId: users[19].id, // Sarah
      },

      // Fikri (users[7]) - Software Engineer follows various devs
      {
        followerId: users[7].id,
        followingId: users[1].id,
      },
      {
        followerId: users[7].id,
        followingId: users[3].id,
      },
      {
        followerId: users[7].id,
        followingId: users[5].id,
      },
      {
        followerId: users[7].id,
        followingId: users[8].id, // Maya - Data Scientist
      },
      {
        followerId: users[7].id,
        followingId: users[15].id, // Yoga - Blockchain
      },
      {
        followerId: users[7].id,
        followingId: users[17].id, // Arif - DBA
      },

      // Maya (users[8]) - Data Scientist follows tech folks
      {
        followerId: users[8].id,
        followingId: users[1].id,
      },
      {
        followerId: users[8].id,
        followingId: users[7].id,
      },
      {
        followerId: users[8].id,
        followingId: users[17].id, // Arif - DBA
      },
      {
        followerId: users[8].id,
        followingId: users[22].id, // Dewi - Business Analyst
      },

      // Reza (users[9]) - Cybersecurity follows security & backend
      {
        followerId: users[9].id,
        followingId: users[1].id,
      },
      {
        followerId: users[9].id,
        followingId: users[5].id,
      },
      {
        followerId: users[9].id,
        followingId: users[13].id, // Fajar - Cloud
      },
      {
        followerId: users[9].id,
        followingId: users[21].id, // Andi - Network
      },

      // Dina (users[10]) - PM follows designers, devs, scrum master
      {
        followerId: users[10].id,
        followingId: users[2].id,
      },
      {
        followerId: users[10].id,
        followingId: users[3].id,
      },
      {
        followerId: users[10].id,
        followingId: users[6].id,
      },
      {
        followerId: users[10].id,
        followingId: users[16].id, // Putri - UX
      },
      {
        followerId: users[10].id,
        followingId: users[18].id, // Lina - Scrum Master
      },
      {
        followerId: users[10].id,
        followingId: users[22].id, // Dewi - Analyst
      },

      // Hendra (users[11]) - iOS Dev follows mobile devs
      {
        followerId: users[11].id,
        followingId: users[0].id,
      },
      {
        followerId: users[11].id,
        followingId: users[3].id,
      },
      {
        followerId: users[11].id,
        followingId: users[4].id, // Rahma - Mobile
      },
      {
        followerId: users[11].id,
        followingId: users[12].id, // Nova - Android
      },
      {
        followerId: users[11].id,
        followingId: users[20].id, // Irfan - Game Dev
      },

      // Nova (users[12]) - Android Dev follows mobile devs
      {
        followerId: users[12].id,
        followingId: users[0].id,
      },
      {
        followerId: users[12].id,
        followingId: users[3].id,
      },
      {
        followerId: users[12].id,
        followingId: users[4].id, // Rahma
      },
      {
        followerId: users[12].id,
        followingId: users[11].id, // Hendra - iOS
      },
      {
        followerId: users[12].id,
        followingId: users[20].id, // Irfan - Game Dev
      },

      // Fajar (users[13]) - Cloud Engineer follows DevOps & backend
      {
        followerId: users[13].id,
        followingId: users[1].id,
      },
      {
        followerId: users[13].id,
        followingId: users[5].id, // Agus - DevOps
      },
      {
        followerId: users[13].id,
        followingId: users[7].id,
      },
      {
        followerId: users[13].id,
        followingId: users[9].id, // Reza - Security
      },
      {
        followerId: users[13].id,
        followingId: users[17].id, // Arif - DBA
      },
      {
        followerId: users[13].id,
        followingId: users[21].id, // Andi - Network
      },

      // Indah (users[14]) - QA follows devs
      {
        followerId: users[14].id,
        followingId: users[0].id,
      },
      {
        followerId: users[14].id,
        followingId: users[1].id,
      },
      {
        followerId: users[14].id,
        followingId: users[3].id,
      },
      {
        followerId: users[14].id,
        followingId: users[18].id, // Lina - Scrum Master
      },

      // Yoga (users[15]) - Blockchain follows tech innovators
      {
        followerId: users[15].id,
        followingId: users[3].id,
      },
      {
        followerId: users[15].id,
        followingId: users[7].id,
      },
      {
        followerId: users[15].id,
        followingId: users[8].id, // Maya - Data Scientist
      },

      // Putri (users[16]) - UX Researcher follows designers & PMs
      {
        followerId: users[16].id,
        followingId: users[2].id,
      },
      {
        followerId: users[16].id,
        followingId: users[6].id,
      },
      {
        followerId: users[16].id,
        followingId: users[10].id, // Dina - PM
      },
      {
        followerId: users[16].id,
        followingId: users[19].id, // Sarah
      },
      {
        followerId: users[16].id,
        followingId: users[22].id, // Dewi - Analyst
      },

      // Arif (users[17]) - DBA follows backend & data folks
      {
        followerId: users[17].id,
        followingId: users[1].id,
      },
      {
        followerId: users[17].id,
        followingId: users[5].id,
      },
      {
        followerId: users[17].id,
        followingId: users[7].id,
      },
      {
        followerId: users[17].id,
        followingId: users[8].id, // Maya - Data Scientist
      },
      {
        followerId: users[17].id,
        followingId: users[13].id, // Fajar - Cloud
      },

      // Lina (users[18]) - Scrum Master follows team members
      {
        followerId: users[18].id,
        followingId: users[0].id,
      },
      {
        followerId: users[18].id,
        followingId: users[1].id,
      },
      {
        followerId: users[18].id,
        followingId: users[3].id,
      },
      {
        followerId: users[18].id,
        followingId: users[10].id, // Dina - PM
      },
      {
        followerId: users[18].id,
        followingId: users[14].id, // Indah - QA
      },

      // Irfan (users[19]) - Game Dev follows creative folks
      {
        followerId: users[19].id,
        followingId: users[2].id,
      },
      {
        followerId: users[19].id,
        followingId: users[6].id,
      },
      {
        followerId: users[19].id,
        followingId: users[11].id, // Hendra - iOS
      },
      {
        followerId: users[19].id,
        followingId: users[12].id, // Nova - Android
      },

      // Sarah (users[20]) - Content Creator follows everyone
      {
        followerId: users[20].id,
        followingId: users[0].id,
      },
      {
        followerId: users[20].id,
        followingId: users[2].id,
      },
      {
        followerId: users[20].id,
        followingId: users[3].id,
      },
      {
        followerId: users[20].id,
        followingId: users[6].id,
      },
      {
        followerId: users[20].id,
        followingId: users[10].id,
      },
      {
        followerId: users[20].id,
        followingId: users[16].id,
      },
      {
        followerId: users[20].id,
        followingId: users[19].id,
      },

      // Andi (users[21]) - Network Engineer follows infrastructure folks
      {
        followerId: users[21].id,
        followingId: users[1].id,
      },
      {
        followerId: users[21].id,
        followingId: users[5].id, // Agus - DevOps
      },
      {
        followerId: users[21].id,
        followingId: users[9].id, // Reza - Security
      },
      {
        followerId: users[21].id,
        followingId: users[13].id, // Fajar - Cloud
      },

      // Dewi (users[22]) - Business Analyst follows PM & data folks
      {
        followerId: users[22].id,
        followingId: users[8].id, // Maya - Data Scientist
      },
      {
        followerId: users[22].id,
        followingId: users[10].id, // Dina - PM
      },
      {
        followerId: users[22].id,
        followingId: users[16].id, // Putri - UX
      },
      {
        followerId: users[22].id,
        followingId: users[17].id, // Arif - DBA
      },

      // Additional mutual follows for more realistic network
      // Popular users get followed back
      {
        followerId: users[7].id,
        followingId: users[0].id, // Fikri follows Ainur back
      },
      {
        followerId: users[13].id,
        followingId: users[1].id, // Fajar follows Budi back
      },
      {
        followerId: users[16].id,
        followingId: users[0].id, // Putri follows Ainur back
      },
      {
        followerId: users[11].id,
        followingId: users[2].id, // Hendra follows Siti
      },
      {
        followerId: users[17].id,
        followingId: users[5].id, // Arif follows Agus back
      },
      {
        followerId: users[19].id,
        followingId: users[0].id, // Sarah follows Ainur back
      },
      {
        followerId: users[4].id,
        followingId: users[1].id, // Rahma follows Budi
      },
      {
        followerId: users[10].id,
        followingId: users[0].id, // Dina follows Ainur
      },
      {
        followerId: users[15].id,
        followingId: users[1].id, // Yoga follows Budi
      },
      {
        followerId: users[8].id,
        followingId: users[3].id, // Maya follows Dwi
      },
      {
        followerId: users[21].id,
        followingId: users[17].id, // Andi follows Arif
      },
    ],
    skipDuplicates: true,
  });
}
