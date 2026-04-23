const { PrismaClient } = require('@prisma/client');

async function check(dbUrl) {
  const prisma = new PrismaClient({
    datasources: {
      db: { url: dbUrl }
    }
  });
  const users = await prisma.user.findMany({ select: { email: true } });
  console.log(`Users in ${dbUrl}:`, users);
  await prisma.$disconnect();
}

async function run() {
  await check('file:./dev.db');
  await check('file:./prisma/dev.db');
}

run().catch(console.error);
