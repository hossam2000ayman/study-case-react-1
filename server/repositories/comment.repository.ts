import { prisma } from "../db/prisma.ts";

export type CommentPageOptions = {
  page: number;
  size: number;
};

export const commentRepository = {
  findPage({ page, size }: CommentPageOptions) {
    return prisma.comment.findMany({
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * size,
      take: size,
    });
  },
};
