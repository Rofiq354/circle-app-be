import express from "express";
import "dotenv/config";
import cors from "cors";
import coockieParser from "cookie-parser";
import authRouter from "./routes/auth";
import dashboardRouter from "./routes/dashboard";
import threadsRouter from "./routes/thread";
import { errorHandler } from "./errors/errorHandler";
import { corsOptions } from "./middlewares/cors";
const app = express();

app.use(express.json());
app.use(cors(corsOptions));
app.use(coockieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/", dashboardRouter);
app.use("/api/v1/", threadsRouter);

app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on localhost:${process.env.PORT || 3000}`);
});
