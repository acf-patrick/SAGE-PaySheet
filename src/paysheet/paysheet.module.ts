import { Module } from '@nestjs/common';
import { PaysheetService } from './paysheet.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaysheetController } from './paysheet.controller';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [PaysheetController],
  providers: [PaysheetService, PrismaService, UserService],
  exports: [PaysheetModule],
})
export class PaysheetModule {}
