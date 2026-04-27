import { Router } from "express";
import { commentRepository } from "../repositories/comment.repository.ts";

export const commentRoutes = Router();

commentRoutes.get("/", async (req, res, next) => {
  try {
    const page = Math.max(Number(req.query.page ?? 1), 1);
    const size = Math.min(Math.max(Number(req.query.size ?? 10), 1), 50);
    const comments = await commentRepository.findPage({ page, size });

    res.json(comments);
  } catch (error) {
    next(error);
  }
});
