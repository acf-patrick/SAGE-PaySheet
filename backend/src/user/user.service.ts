import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto, UserDto } from './dto/user.dto';

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

  // Get one specific user
  async getUser(id: string) {
    try {
      return await this.prisma.user.findUnique({
        where: {
          id,
        },
        select: {
          name: true,
          lastName: true,
          username: true,
          paysheets: true,
        },
      });
    } catch (err) {
      console.log(err);
      return 'Error: ' + err;
    }
  }

  // Get users by a keyword for name and last name
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
            {
              username: {
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

  // Delete all users
  async deleteAllUsers() {
    try {
      await this.prisma.user.deleteMany();
      return 'All Pay Sheets are deleted!';
    } catch (err) {
      return 'Error while deleting pay sheets';
    }
  }

  // Delete one specific user
  async deleteUser(id: string) {
    try {
      await this.prisma.user.delete({
        where: {
          id,
        },
      });
      return 'User with id: ' + id + ' deleted.';
    } catch (err) {
      console.log(err);
      return 'Error: ' + err;
    }
  }

  // Update one specific user
  async updateUser(updateUserDto: UpdateUserDto) {
    const roles = ['ADMIN', 'USER'];
    try {
      if (
        updateUserDto.role &&
        roles.find((role) => role == updateUserDto.role) == undefined
      ) {
        throw new NotFoundException(
          'Role ' + '"' + updateUserDto.role + '" not found.',
        );
      }

      return await this.prisma.user.update({
        data: {
          name: updateUserDto.name,
          lastName: updateUserDto.lastName,
          username: updateUserDto.username,
          password: updateUserDto.password,
          role: updateUserDto.role,
        },
        where: {
          id: updateUserDto.id,
        },
      });
    } catch (err) {
      console.log(err);
      return 'Error: ' + err;
    }
  }

  // Create user
  async createUser(userDto: UserDto) {
    try {
      return await this.prisma.user.create({
        data: {
          ...userDto,
          password: await bcrypt.hash(userDto.password, 10),
        },
      });
    } catch (err) {
      console.log(err);
      return 'Error: ' + err;
    }
  }
}
