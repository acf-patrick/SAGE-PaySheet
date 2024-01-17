import { Injectable, NotFoundException } from '@nestjs/common';
import { Paysheet, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaySheetDto, UpdatePaySheetDto } from './dto/paysheet.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PaysheetService {
  constructor(
    private readonly prisma: PrismaService,
    private userService: UserService,
  ) {}

  // Getting all paysheets
  async getPaySheets() {
    try {
      return await this.prisma.paysheet.findMany();
    } catch (err) {
      console.log(err);
      return 'Error: ' + err;
    }
  }

  // Get pay sheets by a keyword for name and last name
  async getPaySheetsByKeyWord(userId: string) {
    try {
      return await this.prisma.paysheet.findMany({
        where: {
          userId,
        },
      });
    } catch (err) {
      console.log(err);
      return 'Error: ' + err;
    }
  }

  // Delete all pay sheets
  async deleteAllPaySheets() {
    try {
      await this.prisma.user.deleteMany();
      return 'All Pay Sheets are deleted!';
    } catch (err) {
      return 'Error while deleting pay sheets';
    }
  }

  // Delete one pay sheet
  async deletePaySheet(id: string) {
    try {
      await this.prisma.paysheet.delete({
        where: {
          id,
        },
      });
      return 'Paysheet with id: ' + id + ' was deleted!';
    } catch (err) {
      return 'Error while deleting pay sheet with id: ' + id;
    }
  }

  // Adding new paysheet
  async addPaySheet(paysheet: PaySheetDto) {
    try {
      if (!paysheet.userId) {
        throw new NotFoundException(
          'User id: ' + paysheet.userId + ' not found',
        );
      }

      const user = await this.prisma.user.findFirst({
        where: {
          id: paysheet.userId,
        },
        include: {
          paysheets: true,
        },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const paysheetToAdd = await this.prisma.paysheet.create({
        data: {
          baseSalary: paysheet.baseSalary,
          advanceOnSalary: paysheet.advanceOnSalary,
          userId: user.id,
        },
      });

      return paysheetToAdd;
    } catch (err) {
      console.log('Error: ' + err);
      return err;
    }
  }

  // Update one specific paysheet
  async updatePaysheet(paysheetDto: UpdatePaySheetDto) {
    try {
      const paysheetToUpdate = await this.prisma.paysheet.findUnique({
        where: {
          id: paysheetDto.id,
        },
      });

      if (!paysheetToUpdate) {
        throw new NotFoundException(
          'Paysheet with id: ' + paysheetDto.id + 'not found.',
        );
      }

      const paysheet = await this.prisma.paysheet.update({
        data: {
          // baseSalary: paysheetDto.baseSalary
          //   ? paysheetDto.baseSalary
          //   : paysheetToUpdate.baseSalary,
          // advanceOnSalary: paysheetDto.advanceOnSalary
          //   ? paysheetDto.advanceOnSalary
          //   : paysheetToUpdate.advanceOnSalary,
          ...paysheetDto,
        },
        where: {
          id: paysheetDto.id,
        },
      });

      return paysheet;
    } catch (err) {
      console.log('Error: ' + err);
      return err;
    }
  }

  async getPaySheetsForOneUser(id: string) {
    try {
      return await this.prisma.paysheet.findMany({
        where: {
          userId: id,
        },
      });
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
