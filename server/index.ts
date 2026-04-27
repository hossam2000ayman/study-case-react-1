import cors from "cors";
import express, { type ErrorRequestHandler } from "express";
import { prisma } from "./db/prisma.ts";
import { commentRoutes } from "./routes/comment.routes.ts";
import { todoRoutes } from "./routes/todo.routes.ts";

const app = express();
const port = Number(process.env.PORT ?? 4000);

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/todos", todoRoutes);
app.use("/api/comments", commentRoutes);

const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  void _next;
  console.error(error);
  res.status(500).json({ message: "Internal server error" });
};

app.use(errorHandler);

const server = app.listen(port, () => {
  console.log(`API server running at http://localhost:${port}`);
});

const shutdown = async () => {
  server.close();
  await prisma.$disconnect();
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
