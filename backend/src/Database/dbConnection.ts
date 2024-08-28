import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Context } from "hono";

let prisma: PrismaClient;

function connection(context: Context): PrismaClient {
  if (!prisma) {
    prisma = new PrismaClient({
      datasourceUrl: context.env?.DATABASE_URL,
    }).$extends(withAccelerate()) as unknown as PrismaClient;
  }

  return prisma;
}

export default connection;
