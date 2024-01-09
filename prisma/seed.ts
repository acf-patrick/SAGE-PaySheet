// seed.ts

import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

async function getRandomUser() {
  try {
    const response = await axios.get('https://randomuser.me/api/');
    const user = response.data.results[0];
    return {
      name: user.name.first,
      lastName: user.name.last,
    };
  } catch (error) {
    console.error('Error fetching random user:', error.message);
    throw error;
  }
}

async function generateRandomUsersWithPaysheets() {
  await prisma.user.deleteMany();
  await prisma.paysheet.deleteMany();

  for (let i = 1; i <= 25; i++) {
    const randomUser = await getRandomUser();
    const paysheet = {
      baseSalary: Math.floor(Math.random() * 100000) + 50000,
      advanceOnSalary:
        Math.random() > 0.5 ? Math.floor(Math.random() * 5000) : 0,
    };

    const createdUser = await prisma.user.create({
      data: {
        name: randomUser.name,
        lastName: randomUser.lastName,
        username: (randomUser.name + ' ' + randomUser.lastName).replaceAll(
          ' ',
          '_',
        ),
      },
    });

    await prisma.paysheet.create({
      data: {
        ...paysheet,
        userId: createdUser.id,
      },
    });
  }
}

generateRandomUsersWithPaysheets()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
