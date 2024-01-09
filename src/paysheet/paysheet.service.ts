import { Injectable, NotFoundException } from '@nestjs/common';
import { Paysheet } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaySheetDto } from './dto/paysheet.dto';
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
      const user = await this.prisma.user.findFirst({
        where: {
          name: paysheet.name,
          lastName: paysheet.lastName,
        },
        include: {
          paysheets: true,
        },
      });

      let userId = '';

      if (!user) {
        userId = (
          await this.prisma.user.create({
            data: {
              name: paysheet.name,
              lastName: paysheet.lastName,
            },
          })
        ).id;
      } else {
        userId = user.id;
      }

      const paysheetToAdd = await this.prisma.paysheet.create({
        data: {
          baseSalary: paysheet.baseSalary,
          advanceOnSalary: paysheet.advanceOnSalary,
          userId,
        },
      });

      return paysheetToAdd;
    } catch (err) {
      console.log('Error: ' + err);
      return err;
    }
  }
}
