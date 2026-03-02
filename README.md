<div align="center">

# 🔵 Circle App — Backend

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://prisma.io)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://postgresql.org)
[![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io)
[![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)](https://jestjs.io)
[![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)](https://swagger.io)

**Backend of Circle App — a Twitter-inspired social media platform built with Node.js, Express, TypeScript, and Prisma.**

[🔗 Frontend Repository](https://github.com/Rofiq354/circle-app-fe)

</div>

---

## ✨ About

Circle App is a full-stack Twitter-inspired social media application. This repository contains the **backend** side of the project — a RESTful API built with Express and TypeScript, using Prisma ORM for database management, Redis for caching, WebSocket for real-time functionality, and Jest for testing.

---

## 🛠️ Tech Stack

| Technology                                                                                               | Purpose                                                |
| -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)        | JavaScript runtime                                     |
| ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white) | Type-safe development                                  |
| ![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)          | Web framework (v5)                                     |
| ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat&logo=prisma&logoColor=white)             | ORM & database migrations                              |
| ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white) | Relational database                                    |
| ![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat&logo=redis&logoColor=white)                | Caching layer (ioredis)                                |
| **Socket.io**                                                                                            | Real-time event broadcasting                           |
| **Joi**                                                                                                  | Request schema validation                              |
| **JWT**                                                                                                  | Authentication token generation                        |
| **Bcrypt**                                                                                               | Password hashing                                       |
| **Multer**                                                                                               | File upload handling (multipart/form-data)             |
| **Cookie Parser**                                                                                        | Cookie-based token handling                            |
| ![Jest](https://img.shields.io/badge/Jest-C21325?style=flat&logo=jest&logoColor=white)                   | Unit & integration testing                             |
| **jest-mock-extended**                                                                                   | Mocking for unit tests                                 |
| ![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=flat&logo=swagger&logoColor=black)          | API documentation (swagger-jsdoc + swagger-ui-express) |

---

## 📋 API Features

**🔐 Authentication**

- User registration and login endpoints
- JWT token generation on successful auth
- Auth middleware to protect private endpoints
- Joi schema validation on all inputs — returns descriptive error messages on invalid requests

**🧵 Thread (Post)**

- Create thread with text-only or text + image (multipart/form-data)
- Retrieve thread list — joins across threads, users, replies, and likes tables
- Thread detail endpoint including nested replies and like data
- Image stored to object storage; filename saved to database
- WebSocket event emitted after thread creation for real-time updates
- Message queue integration after image upload

**💬 Reply**

- Create reply to a thread with optional image attachment
- Image stored to object storage
- Data retrieved alongside thread detail

**❤️ Like / Unlike**

- Create like record in database (like)
- Delete like record from database (unlike)

**👤 Profile**

- Retrieve authenticated user's profile
- Retrieve any user's profile by ID

**👥 Follow / Unfollow**

- Follow and unfollow a user
- Fetch followers or following list via query params (`?type=followers` / `?type=following`)
- Supports fetching for both self and other users

**🔍 Search**

- Search users by name or username

**⚡ Redis Caching — My Thread Flow**

1. User accesses "My Thread" page
2. Server checks Redis cache for existing data
3. **Cache hit** → returns data directly from Redis (fast response)
4. **Cache miss** → fetches from PostgreSQL, stores result in Redis, returns response
5. Subsequent requests served from cache until invalidated

---

## 🧪 Testing

The backend is covered with automated tests using **Jest**:

- **Unit Test** — isolated testing of individual functions and services
- **Functional Test** — testing specific features end-to-end
- **Integration Test** — testing interactions between multiple components/layers

```bash
# Run all tests
npm run test

# Run with coverage
npm run test:coverage
```

---

## 📖 API Documentation

All endpoints are documented using **Swagger (OpenAPI)**. After running the server, visit:

```
http://localhost:5000/api-docs
```

---

## 🚀 Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/Rofiq354/circle-app-be.git
cd circle-app-be

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# Fill in DATABASE_URL, JWT_SECRET, REDIS_URL, and storage credentials

# 4. Run database migration
npx prisma migrate dev

# 5. Start development server
npm run dev
```

---

## 📁 Project Structure

```
circle-app-be/
├── prisma/
│   ├── schema.prisma           # Database schema & relations
│   └── migrations/             # Migration history
├── public/                     # Public assets
└── src/
    ├── config/                 # App & environment configuration
    ├── controllers/            # Request handlers
    ├── errors/                 # Custom error classes
    ├── lib/                    # Third-party library setup
    ├── middlewares/
    │   ├── auth.ts             # JWT auth middleware
    │   ├── cors.ts             # CORS configuration
    │   └── multer.ts           # File upload middleware
    ├── prisma/
    │   ├── seeds/              # Database seeders
    │   ├── prismaClient.ts     # Prisma client instance
    │   └── seed.ts             # Seed entry point
    ├── routes/                 # Route definitions
    ├── swagger/                # Swagger/OpenAPI config & docs
    ├── test/                   # Unit, functional & integration tests
    ├── types/                  # TypeScript type definitions
    ├── utils/                  # Helper functions
    ├── validations/            # Joi schema validations
    ├── app.ts                  # Express app setup
    └── swagger.ts              # Swagger initialization
```

---

<div align="center">

_Part of the Circle App full-stack project — built day by day, feature by feature. 🚀_

\*by **Ainur Rofiq\***

</div>
