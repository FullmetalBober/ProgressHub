import { PrismaClient } from '@prisma/client';
// import { PrismaClient as PrismaClientEdge } from '@prisma/client/edge';
// import { withAccelerate } from '@prisma/extension-accelerate';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

// const prismaClientEdgeSingleton = () => {
//   return new PrismaClientEdge().$extends(withAccelerate());
// };

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
  // var prismaEdge: undefined | ReturnType<typeof prismaClientEdgeSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();
// const prismaEdge = globalThis.prismaEdge ?? prismaClientEdgeSingleton();

export { prisma };

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
  // globalThis.prismaEdge = prismaEdge;
}
