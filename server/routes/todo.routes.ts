import { Router } from "express";
import { todoRepository } from "../repositories/todo.repository.ts";

export const todoRoutes = Router();

todoRoutes.get("/", async (_req, res, next) => {
  try {
    const todos = await todoRepository.findMany();
    res.json(todos);
  } catch (error) {
    next(error);
  }
});

todoRoutes.get("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const todo = await todoRepository.findById(id);

    if (!todo) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }

    res.json(todo);
  } catch (error) {
    next(error);
  }
});

todoRoutes.post("/", async (req, res, next) => {
  try {
    const title = String(req.body.title ?? "").trim();

    if (!title) {
      res.status(400).json({ message: "Title is required" });
      return;
    }

    const todo = await todoRepository.create({
      title,
      completed: Boolean(req.body.completed),
    });

    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
});

todoRoutes.patch("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const todo = await todoRepository.update(id, {
      title:
        typeof req.body.title === "string" ? req.body.title.trim() : undefined,
      completed:
        typeof req.body.completed === "boolean"
          ? req.body.completed
          : undefined,
    });

    res.json(todo);
  } catch (error) {
    next(error);
  }
});

todoRoutes.delete("/:id", async (req, res, next) => {
  try {
    await todoRepository.delete(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});
