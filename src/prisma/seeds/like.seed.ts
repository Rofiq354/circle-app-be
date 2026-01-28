import { PrismaClient } from "@prisma/client";

export async function seedLikes(
  prisma: PrismaClient,
  users: { id: number }[],
  threads: { id: number }[],
) {
  return prisma.like.createMany({
    data: [
      { userId: users[1].id, threadId: threads[0].id },
      { userId: users[2].id, threadId: threads[0].id },
      { userId: users[0].id, threadId: threads[1].id },

      // Thread 0 (Prisma ORM) - Popular thread
      { userId: users[3].id, threadId: threads[0].id },
      { userId: users[4].id, threadId: threads[0].id },
      { userId: users[5].id, threadId: threads[0].id },
      { userId: users[7].id, threadId: threads[0].id },
      { userId: users[9].id, threadId: threads[0].id },

      // Thread 1 (Circle App) - Medium popularity
      { userId: users[2].id, threadId: threads[1].id },
      { userId: users[3].id, threadId: threads[1].id },
      { userId: users[6].id, threadId: threads[1].id },
      { userId: users[11].id, threadId: threads[1].id },

      // Thread 2 (Design UX) - Popular among designers
      { userId: users[1].id, threadId: threads[2].id },
      { userId: users[2].id, threadId: threads[2].id },
      { userId: users[6].id, threadId: threads[2].id },
      { userId: users[10].id, threadId: threads[2].id },
      { userId: users[16].id, threadId: threads[2].id },

      // Thread 3 (React Hooks) - Very popular
      { userId: users[0].id, threadId: threads[3].id },
      { userId: users[1].id, threadId: threads[3].id },
      { userId: users[4].id, threadId: threads[3].id },
      { userId: users[5].id, threadId: threads[3].id },
      { userId: users[11].id, threadId: threads[3].id },
      { userId: users[12].id, threadId: threads[3].id },
      { userId: users[15].id, threadId: threads[3].id },
      { userId: users[20].id, threadId: threads[3].id },

      // Thread 4 (Tips Programming) - Very popular, motivational
      { userId: users[0].id, threadId: threads[4].id },
      { userId: users[1].id, threadId: threads[4].id },
      { userId: users[3].id, threadId: threads[4].id },
      { userId: users[7].id, threadId: threads[4].id },
      { userId: users[11].id, threadId: threads[4].id },
      { userId: users[12].id, threadId: threads[4].id },
      { userId: users[15].id, threadId: threads[4].id },
      { userId: users[18].id, threadId: threads[4].id },
      { userId: users[19].id, threadId: threads[4].id },
      { userId: users[22].id, threadId: threads[4].id },

      // Thread 5 (REST vs GraphQL) - Popular discussion
      { userId: users[0].id, threadId: threads[5].id },
      { userId: users[3].id, threadId: threads[5].id },
      { userId: users[4].id, threadId: threads[5].id },
      { userId: users[7].id, threadId: threads[5].id },
      { userId: users[9].id, threadId: threads[5].id },
      { userId: users[13].id, threadId: threads[5].id },

      // Thread 6 (Figma Update) - Popular among designers
      { userId: users[0].id, threadId: threads[6].id },
      { userId: users[2].id, threadId: threads[6].id },
      { userId: users[10].id, threadId: threads[6].id },
      { userId: users[16].id, threadId: threads[6].id },
      { userId: users[20].id, threadId: threads[6].id },

      // Thread 7 (Golang Performance) - Backend devs interest
      { userId: users[1].id, threadId: threads[7].id },
      { userId: users[4].id, threadId: threads[7].id },
      { userId: users[5].id, threadId: threads[7].id },
      { userId: users[9].id, threadId: threads[7].id },
      { userId: users[13].id, threadId: threads[7].id },
      { userId: users[17].id, threadId: threads[7].id },
      { userId: users[21].id, threadId: threads[7].id },

      // Thread 8 (Machine Learning) - Tech enthusiasts
      { userId: users[0].id, threadId: threads[8].id },
      { userId: users[4].id, threadId: threads[8].id },
      { userId: users[7].id, threadId: threads[8].id },
      { userId: users[15].id, threadId: threads[8].id },
      { userId: users[17].id, threadId: threads[8].id },
      { userId: users[22].id, threadId: threads[8].id },

      // Thread 9 (Database Backup) - Critical topic, many likes
      { userId: users[0].id, threadId: threads[9].id },
      { userId: users[1].id, threadId: threads[9].id },
      { userId: users[4].id, threadId: threads[9].id },
      { userId: users[5].id, threadId: threads[9].id },
      { userId: users[7].id, threadId: threads[9].id },
      { userId: users[13].id, threadId: threads[9].id },
      { userId: users[17].id, threadId: threads[9].id },
      { userId: users[21].id, threadId: threads[9].id },

      // Thread 10 (Product Roadmap) - PM and stakeholders
      { userId: users[2].id, threadId: threads[10].id },
      { userId: users[6].id, threadId: threads[10].id },
      { userId: users[16].id, threadId: threads[10].id },
      { userId: users[18].id, threadId: threads[10].id },

      // Thread 11 (SwiftUI) - iOS developers
      { userId: users[3].id, threadId: threads[11].id },
      { userId: users[4].id, threadId: threads[11].id },
      { userId: users[12].id, threadId: threads[11].id },
      { userId: users[19].id, threadId: threads[11].id },

      // Thread 12 (Jetpack Compose) - Android developers
      { userId: users[4].id, threadId: threads[12].id },
      { userId: users[11].id, threadId: threads[12].id },
      { userId: users[19].id, threadId: threads[12].id },

      // Thread 13 (AWS vs Azure vs GCP) - DevOps interest
      { userId: users[4].id, threadId: threads[13].id },
      { userId: users[5].id, threadId: threads[13].id },
      { userId: users[9].id, threadId: threads[13].id },
      { userId: users[10].id, threadId: threads[13].id },
      { userId: users[13].id, threadId: threads[13].id },
      { userId: users[21].id, threadId: threads[13].id },

      // Thread 14 (Automation Testing) - QA and developers
      { userId: users[1].id, threadId: threads[14].id },
      { userId: users[4].id, threadId: threads[14].id },
      { userId: users[5].id, threadId: threads[14].id },
      { userId: users[7].id, threadId: threads[14].id },
      { userId: users[18].id, threadId: threads[14].id },

      // Thread 15 (Web3 Development) - Blockchain enthusiasts
      { userId: users[4].id, threadId: threads[15].id },
      { userId: users[7].id, threadId: threads[15].id },
      { userId: users[13].id, threadId: threads[15].id },

      // Thread 16 (User Research) - Designers and PMs
      { userId: users[2].id, threadId: threads[16].id },
      { userId: users[6].id, threadId: threads[16].id },
      { userId: users[10].id, threadId: threads[16].id },
      { userId: users[18].id, threadId: threads[16].id },
      { userId: users[20].id, threadId: threads[16].id },

      // Thread 17 (PostgreSQL Indexing) - Database folks
      { userId: users[1].id, threadId: threads[17].id },
      { userId: users[4].id, threadId: threads[17].id },
      { userId: users[5].id, threadId: threads[17].id },
      { userId: users[9].id, threadId: threads[17].id },
      { userId: users[13].id, threadId: threads[17].id },

      // Thread 18 (Daily Standup) - Agile practitioners
      { userId: users[1].id, threadId: threads[18].id },
      { userId: users[4].id, threadId: threads[18].id },
      { userId: users[10].id, threadId: threads[18].id },
      { userId: users[16].id, threadId: threads[18].id },

      // Thread 19 (Unity Game Dev) - Game developers
      { userId: users[7].id, threadId: threads[19].id },
      { userId: users[11].id, threadId: threads[19].id },
      { userId: users[12].id, threadId: threads[19].id },
      { userId: users[15].id, threadId: threads[19].id },

      // Thread 20 (Content Creation) - Creators
      { userId: users[2].id, threadId: threads[20].id },
      { userId: users[6].id, threadId: threads[20].id },
      { userId: users[10].id, threadId: threads[20].id },
      { userId: users[16].id, threadId: threads[20].id },

      // Thread 21 (Network Monitoring) - Network engineers
      { userId: users[9].id, threadId: threads[21].id },
      { userId: users[13].id, threadId: threads[21].id },
      { userId: users[17].id, threadId: threads[21].id },

      // Thread 22 (Data Visualization) - Data analysts
      { userId: users[8].id, threadId: threads[22].id },
      { userId: users[10].id, threadId: threads[22].id },
      { userId: users[17].id, threadId: threads[22].id },

      // Thread 23 (TypeScript Strict Mode) - Popular among devs
      { userId: users[0].id, threadId: threads[23].id },
      { userId: users[1].id, threadId: threads[23].id },
      { userId: users[4].id, threadId: threads[23].id },
      { userId: users[5].id, threadId: threads[23].id },
      { userId: users[7].id, threadId: threads[23].id },
      { userId: users[11].id, threadId: threads[23].id },
      { userId: users[12].id, threadId: threads[23].id },

      // Thread 24 (Code Review) - Very popular, important topic
      { userId: users[0].id, threadId: threads[24].id },
      { userId: users[1].id, threadId: threads[24].id },
      { userId: users[3].id, threadId: threads[24].id },
      { userId: users[5].id, threadId: threads[24].id },
      { userId: users[7].id, threadId: threads[24].id },
      { userId: users[10].id, threadId: threads[24].id },
      { userId: users[14].id, threadId: threads[24].id },
      { userId: users[18].id, threadId: threads[24].id },

      // Thread 25 (Docker Compose) - DevOps popular
      { userId: users[1].id, threadId: threads[25].id },
      { userId: users[4].id, threadId: threads[25].id },
      { userId: users[7].id, threadId: threads[25].id },
      { userId: users[9].id, threadId: threads[25].id },
      { userId: users[13].id, threadId: threads[25].id },
      { userId: users[21].id, threadId: threads[25].id },

      // Thread 26 (Tailwind CSS) - Frontend devs love this
      { userId: users[1].id, threadId: threads[26].id },
      { userId: users[2].id, threadId: threads[26].id },
      { userId: users[3].id, threadId: threads[26].id },
      { userId: users[6].id, threadId: threads[26].id },
      { userId: users[11].id, threadId: threads[26].id },
      { userId: users[16].id, threadId: threads[26].id },

      // Thread 27 (Microservices) - Architecture topic
      { userId: users[4].id, threadId: threads[27].id },
      { userId: users[5].id, threadId: threads[27].id },
      { userId: users[9].id, threadId: threads[27].id },
      { userId: users[10].id, threadId: threads[27].id },
      { userId: users[13].id, threadId: threads[27].id },

      // Thread 28 (Clean Code) - Important for all devs
      { userId: users[0].id, threadId: threads[28].id },
      { userId: users[3].id, threadId: threads[28].id },
      { userId: users[4].id, threadId: threads[28].id },
      { userId: users[5].id, threadId: threads[28].id },
      { userId: users[7].id, threadId: threads[28].id },
      { userId: users[18].id, threadId: threads[28].id },

      // Thread 29 (Git Branching) - All developers
      { userId: users[0].id, threadId: threads[29].id },
      { userId: users[1].id, threadId: threads[29].id },
      { userId: users[4].id, threadId: threads[29].id },
      { userId: users[5].id, threadId: threads[29].id },
      { userId: users[10].id, threadId: threads[29].id },

      // Thread 30 (Mobile First Design) - Designers and frontend
      { userId: users[2].id, threadId: threads[30].id },
      { userId: users[6].id, threadId: threads[30].id },
      { userId: users[11].id, threadId: threads[30].id },
      { userId: users[12].id, threadId: threads[30].id },
      { userId: users[16].id, threadId: threads[30].id },

      // Thread 31 (Debugging) - All developers relate
      { userId: users[0].id, threadId: threads[31].id },
      { userId: users[1].id, threadId: threads[31].id },
      { userId: users[3].id, threadId: threads[31].id },
      { userId: users[4].id, threadId: threads[31].id },
      { userId: users[7].id, threadId: threads[31].id },

      // Thread 32 (API Rate Limiting) - Security conscious
      { userId: users[1].id, threadId: threads[32].id },
      { userId: users[5].id, threadId: threads[32].id },
      { userId: users[9].id, threadId: threads[32].id },
      { userId: users[13].id, threadId: threads[32].id },
      { userId: users[21].id, threadId: threads[32].id },

      // Thread 33 (Pair Programming) - Collaborative devs
      { userId: users[0].id, threadId: threads[33].id },
      { userId: users[1].id, threadId: threads[33].id },
      { userId: users[3].id, threadId: threads[33].id },
      { userId: users[4].id, threadId: threads[33].id },
      { userId: users[18].id, threadId: threads[33].id },

      // Thread 34 (Redis Caching) - Performance enthusiasts
      { userId: users[1].id, threadId: threads[34].id },
      { userId: users[4].id, threadId: threads[34].id },
      { userId: users[5].id, threadId: threads[34].id },
      { userId: users[9].id, threadId: threads[34].id },
      { userId: users[13].id, threadId: threads[34].id },
      { userId: users[22].id, threadId: threads[34].id },

      // Thread 35 (Component Library) - Frontend devs
      { userId: users[0].id, threadId: threads[35].id },
      { userId: users[2].id, threadId: threads[35].id },
      { userId: users[3].id, threadId: threads[35].id },
      { userId: users[6].id, threadId: threads[35].id },
      { userId: users[16].id, threadId: threads[35].id },
    ],
  });
}
