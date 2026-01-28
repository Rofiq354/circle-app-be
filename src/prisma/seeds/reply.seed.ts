import { PrismaClient } from "@prisma/client";

export async function seedReplies(
  prisma: PrismaClient,
  users: { id: number }[],
  threads: { id: number }[],
) {
  return prisma.reply.createMany({
    data: [
      {
        content: "Setuju banget! Prisma enak dipakai.",
        userId: users[1].id,
        threadId: threads[0].id,
      },
      {
        content: "Mirip Threads tapi versi Indonesia 🇮🇩",
        userId: users[2].id,
        threadId: threads[1].id,
      },
      {
        content: "UX memang nomor satu 👍",
        userId: users[0].id,
        threadId: threads[2].id,
        image: "http://localhost:3003/public/uploads/image-2.jpg",
      },
      // Replies untuk Thread React Hooks
      {
        content: "useEffect dependency array masih suka bikin bingung sih 😅",
        userId: users[0].id,
        threadId: threads[3].id,
      },
      {
        content: "Coba pelajari useCallback dan useMemo juga, super helpful!",
        userId: users[5].id,
        threadId: threads[3].id,
      },
      {
        content: "Ada rekomendasi tutorial yang bagus? Mau belajar juga nih",
        userId: users[12].id,
        threadId: threads[3].id,
      },
      // Replies untuk Thread Tips Programming
      {
        content: "Bener banget! Error adalah bagian dari proses belajar 💪",
        userId: users[7].id,
        threadId: threads[4].id,
      },
      {
        content: "Stack Overflow jadi teman baik pas debugging 😂",
        userId: users[15].id,
        threadId: threads[4].id,
      },
      {
        content: "Tambahan: jangan malu bertanya ke senior atau komunitas!",
        userId: users[18].id,
        threadId: threads[4].id,
      },
      {
        content: "Error messages itu petunjuk, bukan musuh 🎯",
        userId: users[3].id,
        threadId: threads[4].id,
      },
      // Replies untuk Thread REST vs GraphQL
      {
        content: "GraphQL untuk project besar, REST untuk yang simple aja",
        userId: users[4].id,
        threadId: threads[5].id,
      },
      {
        content: "Over-fetching di REST emang jadi masalah pas scale up",
        userId: users[7].id,
        threadId: threads[5].id,
      },
      {
        content: "Pernah coba tRPC? Menarik juga sebagai alternatif",
        userId: users[13].id,
        threadId: threads[5].id,
      },
      // Replies untuk Thread Figma
      {
        content: "Auto layout emang game changer! Design jadi lebih responsive",
        userId: users[2].id,
        threadId: threads[6].id,
      },
      {
        content: "Plugin Figma juga makin banyak yang keren-keren 🔥",
        userId: users[16].id,
        threadId: threads[6].id,
        image: "http://localhost:3003/public/uploads/figma-plugins.jpg",
      },
      // Replies untuk Thread Golang
      {
        content: "Concurrency di Go memang beda level! Goroutine is love ❤️",
        userId: users[4].id,
        threadId: threads[7].id,
      },
      {
        content: "Compile time nya juga cepet banget ya",
        userId: users[5].id,
        threadId: threads[7].id,
      },
      {
        content: "Punya benchmark perbandingannya? Penasaran nih",
        userId: users[13].id,
        threadId: threads[7].id,
      },
      // Replies untuk Thread Machine Learning
      {
        content: "PyTorch atau TensorFlow nih? Lagi belajar ML juga",
        userId: users[17].id,
        threadId: threads[8].id,
      },
      {
        content: "Dataset apa yang dipake buat belajar? Share dong!",
        userId: users[22].id,
        threadId: threads[8].id,
      },
      // Replies untuk Thread Database Backup
      {
        content: "Almost lost production data sounds terrifying! 😱",
        userId: users[9].id,
        threadId: threads[9].id,
      },
      {
        content: "Automated backup script is a must! Jangan manual lagi",
        userId: users[17].id,
        threadId: threads[9].id,
      },
      {
        content: "Pake tool apa buat backup? Lagi cari yang reliable nih",
        userId: users[13].id,
        threadId: threads[9].id,
      },
      {
        content:
          "Testing restore process juga penting! Backup yang gak bisa di-restore = useless",
        userId: users[21].id,
        threadId: threads[9].id,
      },
      // Replies untuk Thread SwiftUI
      {
        content: "Combine framework nya juga worth it buat dipelajari!",
        userId: users[3].id,
        threadId: threads[11].id,
      },
      {
        content: "Migration dari UIKit ke SwiftUI smooth gak?",
        userId: users[12].id,
        threadId: threads[11].id,
      },
      // Replies untuk Thread Jetpack Compose
      {
        content: "Performance dibanding XML gimana? Ada improvement?",
        userId: users[11].id,
        threadId: threads[12].id,
      },
      {
        content: "Compose Navigation udah production ready belum ya?",
        userId: users[4].id,
        threadId: threads[12].id,
      },
      {
        content: "Learning curve nya lumayan ya, tapi worth it sih!",
        userId: users[19].id,
        threadId: threads[12].id,
      },
      // Replies untuk Thread Cloud Providers
      {
        content: "AWS market share terbesar tapi pricing nya agak mahal",
        userId: users[9].id,
        threadId: threads[13].id,
      },
      {
        content: "GCP Kubernetes engine menurutku paling mature",
        userId: users[4].id,
        threadId: threads[13].id,
      },
      {
        content: "Azure integration dengan Microsoft ecosystem is seamless 👌",
        userId: users[10].id,
        threadId: threads[13].id,
      },
      // Replies untuk Thread Automation Testing
      {
        content: "Selenium kadang flaky sih, consider Playwright atau Cypress",
        userId: users[1].id,
        threadId: threads[14].id,
      },
      {
        content: "Unit test coverage minimal 80% should be the standard!",
        userId: users[18].id,
        threadId: threads[14].id,
      },
      {
        content: "Integration testing sama penting nya dengan unit testing",
        userId: users[5].id,
        threadId: threads[14].id,
      },
      // Replies untuk Thread Web3
      {
        content: "Gas fees di Ethereum masih jadi concern utama ya",
        userId: users[7].id,
        threadId: threads[15].id,
      },
      {
        content: "Solana atau Polygon bisa jadi alternatif yang lebih murah",
        userId: users[13].id,
        threadId: threads[15].id,
      },
      // Replies untuk Thread User Research
      {
        content:
          "Data-driven design is the way! No more assumption-based decisions",
        userId: users[10].id,
        threadId: threads[16].id,
      },
      {
        content: "User testing revealing unexpected insights every time 💡",
        userId: users[6].id,
        threadId: threads[16].id,
      },
      // Replies untuk Thread PostgreSQL
      {
        content: "Btree vs Hash index juga penting dipahami!",
        userId: users[9].id,
        threadId: threads[17].id,
      },
      {
        content: "EXPLAIN ANALYZE is your best friend buat optimize queries",
        userId: users[5].id,
        threadId: threads[17].id,
      },
      {
        content: "Composite index bisa bantu banyak kalau querynya complex",
        userId: users[13].id,
        threadId: threads[17].id,
      },
      // Replies untuk Thread Daily Standup
      {
        content: "Plus: update async via Slack bisa lebih efficient sometimes",
        userId: users[4].id,
        threadId: threads[18].id,
      },
      {
        content: "Standup bukan status meeting! It's about collaboration 🤝",
        userId: users[10].id,
        threadId: threads[18].id,
      },
      // Replies untuk Thread Unity Game Dev
      {
        content:
          "Mobile game optimization tips dong! Frame rate masih struggle",
        userId: users[15].id,
        threadId: threads[19].id,
      },
      {
        content: "Unity Asset Store has amazing resources btw 🎮",
        userId: users[7].id,
        threadId: threads[19].id,
      },
      // Replies untuk Thread TypeScript
      {
        content: "Never going back to vanilla JavaScript after TypeScript! 💙",
        userId: users[0].id,
        threadId: threads[23].id,
      },
      {
        content: "Typescript compiler catching bugs before runtime = lifesaver",
        userId: users[5].id,
        threadId: threads[23].id,
      },
      {
        content: "Type inference di TS makin canggih aja setiap update",
        userId: users[11].id,
        threadId: threads[23].id,
      },
      // Replies untuk Thread Code Review
      {
        content: "Constructive feedback > destructive criticism. Always! 🙏",
        userId: users[1].id,
        threadId: threads[24].id,
      },
      {
        content: "Code review juga kesempatan buat belajar best practices",
        userId: users[18].id,
        threadId: threads[24].id,
      },
      {
        content: "Automated linting helps maintain code quality standards",
        userId: users[14].id,
        threadId: threads[24].id,
      },
      // Replies untuk Thread Docker
      {
        content:
          "Docker compose file makes onboarding new devs so much easier!",
        userId: users[13].id,
        threadId: threads[25].id,
      },
      {
        content:
          "Multi-stage builds helped reduce our image size drastically 🐳",
        userId: users[9].id,
        threadId: threads[25].id,
      },
      {
        content: "Kubernetes next step after mastering Docker?",
        userId: users[4].id,
        threadId: threads[25].id,
      },
      // Replies untuk Thread Tailwind CSS
      {
        content: "CSS-in-JS vs Tailwind, team mana nih? 😄",
        userId: users[2].id,
        threadId: threads[26].id,
      },
      {
        content: "Tailwind config customization is super flexible! Love it 🎨",
        userId: users[6].id,
        threadId: threads[26].id,
      },
      {
        content: "Dark mode support di Tailwind juga easy banget implement nya",
        userId: users[16].id,
        threadId: threads[26].id,
      },
      // Replies untuk Thread Microservices
      {
        content:
          "Distributed tracing jadi crucial di microservices architecture",
        userId: users[13].id,
        threadId: threads[27].id,
      },
      {
        content: "Service mesh like Istio bisa solve communication complexity",
        userId: users[9].id,
        threadId: threads[27].id,
      },
      {
        content: "Modular monolith bisa jadi stepping stone yang bagus",
        userId: users[10].id,
        threadId: threads[27].id,
      },
      // Replies untuk Thread Clean Code
      {
        content: "Uncle Bob's Clean Code book is still relevant today! 📚",
        userId: users[4].id,
        threadId: threads[28].id,
      },
      {
        content: "Function naming should describe what it does, not how",
        userId: users[18].id,
        threadId: threads[28].id,
      },
      // Replies untuk Thread Git Branching
      {
        content: "Git flow vs GitHub flow, which one better? 🤔",
        userId: users[5].id,
        threadId: threads[29].id,
      },
      {
        content:
          "Feature flags bisa bantu manage releases dengan lebih flexible",
        userId: users[10].id,
        threadId: threads[29].id,
      },
      // Replies untuk Thread Mobile First
      {
        content: "Progressive Web Apps also gaining traction! 📱💻",
        userId: users[11].id,
        threadId: threads[30].id,
      },
      {
        content: "Touch targets minimum 44x44px jangan lupa ya!",
        userId: users[6].id,
        threadId: threads[30].id,
      },
      {
        content: "Mobile performance optimization is different from desktop",
        userId: users[12].id,
        threadId: threads[30].id,
      },
      // Replies untuk Thread Debugging
      {
        content:
          "Browser DevTools is underrated! So powerful untuk debugging 🔍",
        userId: users[3].id,
        threadId: threads[31].id,
      },
      {
        content: "Debugger statement > console.log for complex debugging",
        userId: users[7].id,
        threadId: threads[31].id,
      },
      // Replies untuk Thread API Rate Limiting
      {
        content: "Implementing exponential backoff juga penting!",
        userId: users[13].id,
        threadId: threads[32].id,
      },
      {
        content: "Cloudflare WAF adds extra layer of protection 🛡️",
        userId: users[21].id,
        threadId: threads[32].id,
      },
      // Replies untuk Thread Pair Programming
      {
        content: "Driver-navigator rotation setiap 15-20 menit works best!",
        userId: users[1].id,
        threadId: threads[33].id,
      },
      {
        content: "Remote pair programming dengan VS Code Live Share juga ok!",
        userId: users[3].id,
        threadId: threads[33].id,
      },
      // Replies untuk Thread Redis Caching
      {
        content: "Cache invalidation strategy is one of hardest problems 😅",
        userId: users[5].id,
        threadId: threads[34].id,
      },
      {
        content: "Redis Sentinel for high availability is recommended!",
        userId: users[13].id,
        threadId: threads[34].id,
      },
      {
        content: "Monitoring cache hit rate is crucial for optimization",
        userId: users[22].id,
        threadId: threads[34].id,
      },
      // Replies untuk Thread Component Library
      {
        content: "Storybook makes component documentation so much better! 📖",
        userId: users[3].id,
        threadId: threads[35].id,
      },
      {
        content: "Accessibility should be built into design system from start",
        userId: users[16].id,
        threadId: threads[35].id,
      },
      {
        content: "Shadcn/ui approach interesting nih, what do you think?",
        userId: users[0].id,
        threadId: threads[35].id,
      },
    ],
  });
}
