// seed.ts

import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

const prisma = new PrismaClient();

// If generating using online api, use this
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

// If offline, use this
const users = [
  {
    id: '90eb2d81-b45c-408e-a3a2-e3d19a74d7ea',
    name: 'Dragan',
    lastName: 'Rašić',
    username: 'Dragan_Rašić',
    password: '$2b$10$JuW8UOSABh0vjPKjl7X.tuSFFyQuIIEVva9WCWllyMNuXzAYjmRIS',
    role: 'USER',
  },
  {
    id: 'ab5a8217-f0be-4ae5-945b-28ff8a2a6edf',
    name: 'Julian',
    lastName: 'Fernandez',
    username: 'Julian_Fernandez',
    password: '$2b$10$fNQS1rcWBEomw4Y6BRhap.W96427hEiGOBZH6TiW2yRpo8Rk0FU1q',
    role: 'USER',
  },
  {
    id: '999400ea-f8d8-4a58-9623-04bb1174e3e5',
    name: 'Gino',
    lastName: 'Galle',
    username: 'Gino_Galle',
    password: '$2b$10$VMWLzSoCJmtJ0Kb3eoQxneiuQlg.6Li7I9sHu8M8Z7IJgcAN5Lp/W',
    role: 'USER',
  },
  {
    id: 'f3dd3038-7758-46ba-bb23-c63aff2d871d',
    name: 'Ryder',
    lastName: 'Hughes',
    username: 'Ryder_Hughes',
    password: '$2b$10$Wc0xeDlMdMPkq5yPcV69I.VylgV66Maw8cjVtjWP4cM41SDbp0/Bi',
    role: 'USER',
  },
  {
    id: 'faef3640-6dd8-4da8-a92f-dfe677d359ca',
    name: 'پارسا',
    lastName: 'کوتی',
    username: 'پارسا_کوتی',
    password: '$2b$10$KZgS5uKkNRZIVyJcKul/Re6GtFE8Xy25lUew1uejSmZu7Wyn3qkUq',
    role: 'USER',
  },
  {
    id: 'd3c8e2c2-6cf7-45a3-84dd-0f3885565800',
    name: 'Felix',
    lastName: 'Olsen',
    username: 'Felix_Olsen',
    password: '$2b$10$ZMs9VpQffj7rFYUM8y3Fl.9mQJqrqnunzqwk1YyV42vjKYY1CbZsK',
    role: 'USER',
  },
  {
    id: '080d05bd-c3f4-47c1-a729-266fd71566b3',
    name: 'Lilja',
    lastName: 'Rantanen',
    username: 'Lilja_Rantanen',
    password: '$2b$10$KJ3Ug9osl4HNhh51..Cu1eSydZP0ThLCcs4XLZvLAVfhHYnWSFBz6',
    role: 'USER',
  },
  {
    id: 'f573d0ad-9a6b-4a05-a39f-90b0d0ffd6d4',
    name: 'Álvaro',
    lastName: 'Velasco',
    username: 'Álvaro_Velasco',
    password: '$2b$10$geaOQUXRnYOhMJYlOndedODtszyuzcccpaWRGB8ytfXZ.eBHk8d52',
    role: 'USER',
  },
  {
    id: '812d5e7a-eabc-49d2-ab9e-e7f957c33cd0',
    name: 'Isobel',
    lastName: 'Marshall',
    username: 'Isobel_Marshall',
    password: '$2b$10$HIcjAK8k6pJJb6LcVmUgMOt8CyK8aOsoPjPE46GUX8Lsdd6mJbsLu',
    role: 'USER',
  },
  {
    id: 'a929cc15-eed6-425b-9d26-e3ca1144eef0',
    name: 'Austin',
    lastName: 'Walker',
    username: 'Austin_Walker',
    password: '$2b$10$McZI0FTvE1kbvlzl4NEF3u3VLlJXMSz3FWtM//FcLhhfRIKDAZEtO',
    role: 'USER',
  },
  {
    id: 'f2418cca-d728-4792-96b8-ab59c33937bd',
    name: 'Lennox',
    lastName: 'Malde',
    username: 'Lennox_Malde',
    password: '$2b$10$TlROqsbDZq0R3MzjHyOqbOgHGBQCYKYxPBL8/muV0u0WkBmSMqZou',
    role: 'USER',
  },
  {
    id: '8a0b65bb-6220-4560-ad4b-f8faab177efe',
    name: 'Metin',
    lastName: 'Nickel',
    username: 'Metin_Nickel',
    password: '$2b$10$vlwwHHmqjOsVLZpvn9oY3.PuqrKt60Qz7IT9WB73R.5RUq1DLa2vC',
    role: 'USER',
  },
  {
    id: '61055ade-b984-4c14-8f8a-e54717bf3f49',
    name: 'Kenan',
    lastName: 'Sandalcı',
    username: 'Kenan_Sandalcı',
    password: '$2b$10$.neQ7Y1.PMpbDOp4EWav2elgeig2zF7L.g.ZrQdbAVd04JHL.45HG',
    role: 'USER',
  },
  {
    id: '71354252-55ec-4dee-b754-f340ebe4b87d',
    name: 'Ira',
    lastName: 'Shetty',
    username: 'Ira_Shetty',
    password: '$2b$10$rzlvn2905nMkllSkHFReoOkC4GaM2VVcLrVzVfFRLi8xUTT1dIs46',
    role: 'USER',
  },
  {
    id: '1a73def4-0ffc-41db-97d7-af291e071321',
    name: 'Eduardo',
    lastName: 'Watts',
    username: 'Eduardo_Watts',
    password: '$2b$10$upXystSwZ9eAIj94QHF.EO4vH5vBjwz2myzlraObPozMKRejsRh4G',
    role: 'USER',
  },
  {
    id: '01ae027b-99b2-43bf-95eb-20c58cffe02e',
    name: 'Boyan',
    lastName: 'Blashchuk',
    username: 'Boyan_Blashchuk',
    password: '$2b$10$UMh2UKFCfodD80O/34s3LO57cmphPv0ZoinCbXnC1kIVmfGSjevI.',
    role: 'USER',
  },
  {
    id: '8db8f953-93bd-4833-a68c-ce59c3e86e4c',
    name: 'Tristan',
    lastName: 'Sørensen',
    username: 'Tristan_Sørensen',
    password: '$2b$10$4k8K2LJW3DdIuf8GortAFOMIq6nWodTVvhHkbTYd9I442/6CGvfmq',
    role: 'USER',
  },
  {
    id: '3ea07de8-1764-4752-bf0d-770de40d7938',
    name: 'Owen',
    lastName: 'Grewal',
    username: 'Owen_Grewal',
    password: '$2b$10$9rU0B2cIkJ56N8WrnoDbSOqHb2spLkqGbAf4uxGeWd/PMeWuhLsam',
    role: 'USER',
  },
  {
    id: 'ec8bfb87-7810-4d49-8162-05ab8f6a6a52',
    name: 'Selma',
    lastName: 'Christensen',
    username: 'Selma_Christensen',
    password: '$2b$10$pi5jHICX5vtO7h4TUc1Bz.QAoCMdX0BffdtGNSuUYV9IRLLQi1MEe',
    role: 'USER',
  },
  {
    id: 'a29ca987-b937-434c-8bab-fe42bd2432b0',
    name: 'سام',
    lastName: 'كامياران',
    username: 'سام_كامياران',
    password: '$2b$10$PuTAJkv59oUR7omZMLoYG.d8WSQc7vlIIha2rhZVoo1MQVEbfw.Fy',
    role: 'USER',
  },
  {
    id: 'b97cdeda-1dd6-4dbc-b59b-ad4d66ee8b04',
    name: 'Tilde',
    lastName: 'Pedersen',
    username: 'Tilde_Pedersen',
    password: '$2b$10$g5KqtGrnJyR41KTF6Alfiuj7HQq.6B4vSuSsInLxUry4FR15.TJF2',
    role: 'USER',
  },
  {
    id: '7094c40f-9db1-4af4-9ac9-5da93f30ef70',
    name: 'Prathiksha',
    lastName: 'Kavser',
    username: 'Prathiksha_Kavser',
    password: '$2b$10$d3eW/gHBwOsNfKbP0BCeNueDKRFvtJchYYDBlqY1fNFVe3IK70pPG',
    role: 'USER',
  },
  {
    id: 'f24a7179-a696-476f-bb7d-f3b9f67d6ad9',
    name: 'Jasmine',
    lastName: 'Ross',
    username: 'Jasmine_Ross',
    password: '$2b$10$n78niadwaBqG.1FwKw/X9Ozxyh3t1a8bZVbr5j8ihxEi2Svw3hEme',
    role: 'USER',
  },
  {
    id: 'ff571ee3-6bd5-4ff6-bf89-7ace5758b1c8',
    name: 'Eren',
    lastName: 'Kumcuoğlu',
    username: 'Eren_Kumcuoğlu',
    password: '$2b$10$1VqZdOGoJKWQNd5zc81A8efLxa37GBBVLAs1EpCyC5dBvmFkWcVle',
    role: 'USER',
  },
  {
    id: '0fa08a8a-d447-40d0-b007-794372665b4f',
    name: 'Sokil',
    lastName: 'Volinec',
    username: 'Sokil_Volinec',
    password: '$2b$10$6.Xm.aYA72T/kz2x/IpL2OvekriNNOG2aBii171NdcegYm3M7bSEe',
    role: 'USER',
  },
];

async function generateRandomUsersWithPaysheets() {
  await prisma.user.deleteMany();
  await prisma.paysheet.deleteMany();

  for (let i = 0; i < 25; i++) {
    // const randomUser = await getRandomUser();  // If using online api
    const randomUser = users[i];
    const paysheet = {
      baseSalary: Math.floor(Math.random() * 100000) + 50000,
      advanceOnSalary:
        Math.random() > 0.5 ? Math.floor(Math.random() * 5000) : 0,
      date: new Date().toISOString(),
    };

    const createdUser = await prisma.user.create({
      data: {
        name: randomUser.name,
        lastName: randomUser.lastName,
        username: (randomUser.name + ' ' + randomUser.lastName).replaceAll(
          ' ',
          '_',
        ),
        password: await bcrypt.hash(
          (randomUser.name + ' ' + randomUser.lastName).replaceAll(' ', '_'),
          saltOrRounds,
        ),
      },
    });

    await prisma.paysheet.create({
      data: {
        ...paysheet,
        user: {
          connect: {
            id: createdUser.id,
          },
        },
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
