import { prisma } from "../db/prisma.ts";

export type CreateTodoData = {
  title: string;
  completed?: boolean;
};

export type UpdateTodoData = {
  title?: string;
  completed?: boolean;
};

export const todoRepository = {
  findMany() {
    return prisma.todo.findMany({
      orderBy: { createdAt: "desc" },
    });
  },

  findById(id: number) {
    return prisma.todo.findUnique({
      where: { id },
    });
  },

  create(data: CreateTodoData) {
    return prisma.todo.create({
      data: {
        title: data.title,
        completed: data.completed ?? false,
      },
    });
  },

  update(id: number, data: UpdateTodoData) {
    return prisma.todo.update({
      where: { id },
      data,
    });
  },

  delete(id: number) {
    return prisma.todo.delete({
      where: { id },
    });
  },
};
