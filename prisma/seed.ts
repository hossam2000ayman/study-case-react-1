import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.todo.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.$executeRaw`
    DELETE FROM sqlite_sequence
    WHERE name IN ('Todo', 'Comment')
  `;

  await prisma.todo.createMany({
    data: [
      { title: "Learn Prisma schema basics", completed: true },
      { title: "Move API calls behind repositories", completed: true },
      { title: "Use React Query with the local API", completed: false },
      { title: "Add optimistic updates later", completed: false },
    ],
  });

  await prisma.comment.createMany({
    data: [
      {
        name: "Architecture note",
        email: "mentor@example.com",
        body: "Keep Prisma on the server and expose app-friendly HTTP routes.",
      },
      {
        name: "React Query note",
        email: "mentor@example.com",
        body: "Hooks should call API functions, not database clients directly.",
      },
      {
        name: "Repository note",
        email: "mentor@example.com",
        body: "Repositories are a clean place to hide Prisma query details.",
      },
      {
        name: "SQLite note",
        email: "mentor@example.com",
        body: "SQLite is excellent for learning and local development.",
      },
      {
        name: "Validation note",
        email: "mentor@example.com",
        body: "Validate request bodies before sending data to the repository.",
      },
      {
        name: "Migration note",
        email: "mentor@example.com",
        body: "Use migrations whenever the schema changes.",
      },
      {
        name: "Feature folder note",
        email: "mentor@example.com",
        body: "Frontend feature folders scale better than one giant services folder.",
      },
      {
        name: "Mutation note",
        email: "mentor@example.com",
        body: "Invalidate related queries after successful mutations.",
      },
      {
        name: "Pagination note",
        email: "mentor@example.com",
        body: "Keep page and size explicit in API requests.",
      },
      {
        name: "Deployment note",
        email: "mentor@example.com",
        body: "In production, the React app and API can be deployed separately or together.",
      },
      {
        name: "Error note",
        email: "mentor@example.com",
        body: "Centralized error middleware keeps route code focused.",
      },
      {
        name: "Next step note",
        email: "mentor@example.com",
        body: "Add Zod later when you want stronger runtime validation.",
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
