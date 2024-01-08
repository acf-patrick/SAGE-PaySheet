// seed.ts

import axios from 'axios';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getRandomUser() {
  try {
    const response = await axios.get('https://randomuser.me/api/');
    const user = response.data.results[0];
    const baseSalary = Math.floor(Math.random() * 20) * 50000 + 50000; // Multiple of 50,000
    return {
      name: user.name.first,
      lastName: user.name.last,
      baseSalary,
      advanceOnSalary:
        Math.random() > 0.5 ? Math.floor(Math.random() * 5000) : 0,
    };
  } catch (error) {
    console.error('Error fetching random user:', error.message);
    throw error;
  }
}

async function main() {
  await prisma.user.deleteMany();

  const users = [];
  for (let i = 1; i <= 25; i++) {
    const randomUser = await getRandomUser();
    users.push(randomUser);
  }

  await prisma.user.createMany({
    data: users,
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
