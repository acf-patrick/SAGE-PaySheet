import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaysheetService } from './paysheet.service';
import { PaySheetDto, UpdatePaySheetDto } from './dto/paysheet.dto';
import { AccessTokenGuard } from 'src/auth/guards/access_token.guard';

@ApiTags('💰 PaySheets')
@Controller('paysheet')
export class PaysheetController {
  constructor(private readonly paysheetService: PaysheetService) {}

  @UseGuards(AccessTokenGuard)
  @Get()
  @ApiOperation({
    summary: 'Get all pay sheets',
  })
  async getPaySheets() {
    return await this.paysheetService.getPaySheets();
  }

  @Get('/search')
  @ApiOperation({
    summary: 'Get one specific pay sheet',
  })
  async getPaySheetsByKeyWord(@Query('userId') userId: string) {
    return await this.paysheetService.getPaySheetsByKeyWord(userId);
  }

  @Delete()
  @ApiOperation({
    summary: 'Delete all pay sheets',
  })
  async deleteAllPaySheets() {
    return await this.paysheetService.deleteAllPaySheets();
  }

  @Post()
  @ApiOperation({
    summary: 'Add new paysheet',
  })
  async addPaysheet(@Body() paysheet: PaySheetDto) {
    return await this.paysheetService.addPaySheet(paysheet);
  }

  @Patch()
  @ApiOperation({
    summary: 'Update specific paysheet',
  })
  async updatePaysheet(@Body() paysheetDto: UpdatePaySheetDto) {
    return await this.paysheetService.updatePaysheet(paysheetDto);
  }
}
