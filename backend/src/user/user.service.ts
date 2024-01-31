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
        include: {
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

      const data = {
        name: updateUserDto.name,
        lastName: updateUserDto.lastName,
        username: updateUserDto.username.toLowerCase(),
        role: updateUserDto.role,
      };

      if (updateUserDto.password.indexOf('*') < 0) {
        data['password'] = await bcrypt.hash(updateUserDto.password, 10);
      }

      return await this.prisma.user.update({
        data,
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
          username: userDto.username.toLowerCase(),
          password: await bcrypt.hash(userDto.password, 10),
        },
      });
    } catch (err) {
      console.log(err);
      return 'Error: ' + err;
    }
  }

  // Get specific user role
  async getUserRole(id: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id,
        },
      });
      return user.role;
    } catch (err) {
      console.log(err);
      return 'Error: ' + err;
    }
  }
}
