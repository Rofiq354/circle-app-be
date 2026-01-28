import { PrismaClient } from "@prisma/client";

export async function seedThreads(
  prisma: PrismaClient,
  users: { id: number }[],
) {
  return prisma.thread.createMany({
    data: [
      {
        content: "Belajar Prisma ORM ternyata menyenangkan 🔥",
        image: "http://localhost:3003/public/uploads/image-1.jpg",
        createdById: users[0].id,
      },
      {
        content: "Circle App mirip Threads, tapi versi lokal 😄",
        createdById: users[1].id,
      },
      {
        content: "Design yang simpel bikin UX makin nyaman",
        createdById: users[2].id,
      },
      // 30+ data tambahan
      {
        content:
          "Setelah 3 bulan belajar React, akhirnya paham konsep hooks! useState dan useEffect udah jadi sahabat sekarang 💙",
        image: "http://localhost:3003/public/uploads/react-hooks.jpg",
        createdById: users[3].id,
      },
      {
        content:
          "Tips buat yang baru mulai belajar programming: jangan takut error! Error itu guru terbaik kita 🚀",
        createdById: users[4].id,
      },
      {
        content:
          "Backend developers, kalian lebih suka REST API atau GraphQL? Share pengalaman kalian dong!",
        createdById: users[5].id,
      },
      {
        content:
          "Figma update baru keren banget! Auto layout makin powerful. Designer wajib coba 🎨",
        image: "http://localhost:3003/public/uploads/figma-update.jpg",
        createdById: users[6].id,
      },
      {
        content:
          "Golang performance memang gak main-main. API response time turun drastis setelah migrasi dari Node.js ⚡",
        createdById: users[7].id,
      },
      {
        content:
          "Spending my weekend exploring machine learning with TensorFlow. The future is exciting! 🤖",
        image: "http://localhost:3003/public/uploads/ml-project.jpg",
        createdById: users[8].id,
      },
      {
        content:
          "Reminder: selalu backup database sebelum migration. Hampir kehilangan data production tadi 😅",
        createdById: users[9].id,
      },
      {
        content:
          "Product roadmap Q1 2026 sudah ready! Excited untuk fitur-fitur baru yang bakal diluncurkan 📊",
        createdById: users[10].id,
      },
      {
        content:
          "SwiftUI bikin development iOS jadi jauh lebih cepat. Declarative UI memang masa depan!",
        image: "http://localhost:3003/public/uploads/swiftui-demo.jpg",
        createdById: users[11].id,
      },
      {
        content:
          "Jetpack Compose udah stable dan production-ready. Saatnya migrate dari XML layout! 🤖💚",
        createdById: users[12].id,
      },
      {
        content:
          "AWS vs Azure vs GCP - masing-masing punya kelebihan. Tergantung use case dan budget sih",
        createdById: users[13].id,
      },
      {
        content:
          "Automation testing bukan cuma buat save time, tapi juga increase confidence saat deploy 🧪✅",
        image: "http://localhost:3003/public/uploads/testing.jpg",
        createdById: users[14].id,
      },
      {
        content:
          "Web3 development is challenging but rewarding. Smart contract security adalah prioritas utama! 🔐",
        createdById: users[15].id,
      },
      {
        content:
          "User research reveals: simple navigation > fancy animations. Always prioritize user needs! 💡",
        createdById: users[16].id,
      },
      {
        content:
          "PostgreSQL indexing tips: jangan asal bikin index di semua column. Analyze query patterns dulu!",
        createdById: users[17].id,
      },
      {
        content:
          "Daily standup should be max 15 minutes. Keep it focused on blockers and progress 🎯",
        createdById: users[18].id,
      },
      {
        content:
          "Unity 2023 LTS is here! Working on a new mobile game project. Can't wait to share the progress 🎮",
        image: "http://localhost:3003/public/uploads/game-dev.jpg",
        createdById: users[19].id,
      },
      {
        content:
          "Content creation tip: authenticity beats perfection. Share your real journey, bukan cuma highlight reel 📸",
        createdById: users[20].id,
      },
      {
        content:
          "Network monitoring tools saved our production today. Early detection = faster resolution! 🔍",
        createdById: users[21].id,
      },
      {
        content:
          "Data visualization is an art. Good charts can tell stories that raw numbers can't 📈",
        image: "http://localhost:3003/public/uploads/data-viz.jpg",
        createdById: users[22].id,
      },
      {
        content:
          "TypeScript strict mode might be annoying at first, but it saves you from so many runtime errors 💪",
        createdById: users[3].id,
      },
      {
        content:
          "Code review bukan cuma cari error, tapi juga knowledge sharing session. Be kind in your comments 🤝",
        createdById: users[4].id,
      },
      {
        content:
          "Docker compose makes local development so much easier. No more 'works on my machine' excuse! 🐳",
        image: "http://localhost:3003/public/uploads/docker.jpg",
        createdById: users[5].id,
      },
      {
        content:
          "Tailwind CSS changed my workflow completely. Utility-first approach is addictive! 🎨⚡",
        createdById: users[0].id,
      },
      {
        content:
          "Microservices architecture bukan silver bullet. Monolith first, microservices when needed 🏗️",
        createdById: users[7].id,
      },
      {
        content:
          "Clean code is not about comments, it's about writing self-explanatory code. Variable naming matters!",
        createdById: users[1].id,
      },
      {
        content:
          "Git branching strategy: keep it simple. Main, develop, dan feature branches udah cukup untuk most projects 🌿",
        createdById: users[13].id,
      },
      {
        content:
          "Mobile-first design isn't optional anymore. 70% traffic dari mobile device! 📱",
        image: "http://localhost:3003/public/uploads/mobile-first.jpg",
        createdById: users[2].id,
      },
      {
        content:
          "Debugging adalah skill yang harus terus diasah. Console.log is your best friend 🐛",
        createdById: users[11].id,
      },
      {
        content:
          "API rate limiting saved us from DDoS attack today. Security measures are crucial! 🛡️",
        createdById: users[9].id,
      },
      {
        content:
          "Pair programming might seem slower, but code quality improves significantly. Try it! 👥💻",
        createdById: users[18].id,
      },
      {
        content:
          "Redis caching reduced our database load by 60%. Performance optimization is continuous work ⚡",
        image: "http://localhost:3003/public/uploads/redis.jpg",
        createdById: users[17].id,
      },
      {
        content:
          "Component library bikin development jadi konsisten. Design system adalah investment yang worth it 🎨",
        createdById: users[6].id,
      },
    ],
  });
}
