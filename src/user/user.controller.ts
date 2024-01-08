import { Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('👤 Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all pay sheets',
  })
  async getPaySheets() {
    return await this.userService.getPaySheets();
  }

  @Get('/search/')
  @ApiOperation({
    summary: 'Get one specific pay sheet',
  })
  async getPaySheetsByKeyWord(@Query('keyword') keyword: string) {
    return await this.userService.getPaySheetsByKeyWord(keyword);
  }

  @Delete()
  @ApiOperation({
    summary: 'Delete all pay sheets',
  })
  async deleteAllPaySheets() {
    return await this.userService.deleteAllPaySheets();
  }
}
