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

  @UseGuards(AccessTokenGuard)
  @Get('/:id')
  @ApiOperation({
    summary: 'Get all pay sheets for one specific user',
  })
  async getPaySheetsForOneUser(@Param('id') id: string) {
    return await this.paysheetService.getPaySheetsForOneUser(id);
  }

  @UseGuards(AccessTokenGuard)
  @Get('/search')
  @ApiOperation({
    summary: 'Get one specific pay sheet',
  })
  async getPaySheetsByKeyWord(@Query('userId') userId: string) {
    return await this.paysheetService.getPaySheetsByKeyWord(userId);
  }

  @UseGuards(AccessTokenGuard)
  @Delete()
  @ApiOperation({
    summary: 'Delete all pay sheets',
  })
  async deleteAllPaySheets() {
    return await this.paysheetService.deleteAllPaySheets();
  }

  @UseGuards(AccessTokenGuard)
  @Post()
  @ApiOperation({
    summary: 'Add new paysheet',
  })
  async addPaysheet(@Body() paysheet: PaySheetDto) {
    return await this.paysheetService.addPaySheet(paysheet);
  }

  @UseGuards(AccessTokenGuard)
  @Patch()
  @ApiOperation({
    summary: 'Update specific paysheet',
  })
  async updatePaysheet(@Body() paysheetDto: UpdatePaySheetDto) {
    return await this.paysheetService.updatePaysheet(paysheetDto);
  }
}
