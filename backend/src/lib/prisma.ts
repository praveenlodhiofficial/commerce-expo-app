import { PrismaPg } from "@prisma/adapter-pg";

import { config } from "@/config";
import { PrismaClient } from "@/generated/prisma/client";

const prismaClientSingleton = () => {
  const adapter = new PrismaPg({
    connectionString: config.database.poolerUrl || config.database.url,
  });

  return new PrismaClient({
    adapter,
  });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (!config.isProduction) globalForPrisma.prisma = prisma;

export default prisma;
