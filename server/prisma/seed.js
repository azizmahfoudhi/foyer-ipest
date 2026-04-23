const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const path = require('path');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: `file:${path.resolve(__dirname, '../dev.db')}`
    }
  }
});

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  // Create Admin
  await prisma.user.upsert({
    where: { email: 'admin@foyer.com' },
    update: {},
    create: {
      email: 'admin@foyer.com',
      name: 'System Admin',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  // Create Dortoirs
  const names = ['1', '2', '3', '4', '5', '6', '7a', '7b', '8a', '8b'];
  for (const name of names) {
    await prisma.dortoir.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log('Seed data created');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
