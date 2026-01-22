import express from "express";
import { createServer } from "node:http";
import "dotenv/config";
import cors from "cors";
import coockieParser from "cookie-parser";
import { Server } from "socket.io";

import authRouter from "./routes/auth";
import dashboardRouter from "./routes/dashboard";
import threadsRouter from "./routes/thread";
import { errorHandler } from "./errors/errorHandler";
import { corsOptions } from "./middlewares/cors";
const app = express();

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Sesuaikan dengan port Frontend kamu (Vite/React)
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket", "polling"],
});

app.use(express.json());
app.use(cors(corsOptions));
app.use(coockieParser());
app.use("/public/images", express.static("public/images"));

app.use((req, res, next) => {
  (req as any).io = io;
  next();
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/", dashboardRouter);
app.use("/api/v1/", threadsRouter);

app.use(errorHandler);

// app.listen(process.env.PORT || 3000, () => {
//   console.log(`Server running on localhost:${process.env.PORT || 3000}`);
// });
server.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on localhost:${process.env.PORT || 3000}`);
});
