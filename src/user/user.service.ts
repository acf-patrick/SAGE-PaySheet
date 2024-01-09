import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  // Getting all users
  async getUsers() {
    try {
      return await this.prisma.user.findMany();
    } catch (err) {
      console.log(err);
      return 'Error: ' + err;
    }
  }

  // Get pay sheets by a keyword for name and last name
  async getUsersByKeyWord(keyword: string) {
    try {
      return await this.prisma.user.findMany({
        where: {
          OR: [
            {
              name: {
                contains: keyword,
                mode: 'insensitive',
              },
            },
            {
              lastName: {
                contains: keyword,
                mode: 'insensitive',
              },
            },
          ],
        },
      });
    } catch (err) {
      console.log(err);
      return 'Error: ' + err;
    }
  }

  // Delete all pay sheets
  async deleteAllUsers() {
    try {
      await this.prisma.user.deleteMany();
      return 'All Pay Sheets are deleted!';
    } catch (err) {
      return 'Error while deleting pay sheets';
    }
  }
}
