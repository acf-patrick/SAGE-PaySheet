import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AccessTokenGuard } from 'src/auth/guards/access_token.guard';
import { UpdateUserDto, UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('👤 Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AccessTokenGuard)
  @Get()
  @ApiOperation({
    summary: 'Get all users',
  })
  async getAllUsers() {
    return await this.userService.getUsers();
  }

  @UseGuards(AccessTokenGuard)
  @Get('/:id')
  @ApiOperation({
    summary: 'Get one specific user',
  })
  async getUser(@Param('id') id: string) {
    return await this.userService.getUser(id);
  }

  @UseGuards(AccessTokenGuard)
  @Get('search/keyword/')
  @ApiOperation({
    summary: 'Get one specific user',
  })
  async getPaySheetsByKeyWord(@Query('keyword') keyword: string) {
    return await this.userService.getUsersByKeyWord(keyword);
  }

  @UseGuards(AccessTokenGuard)
  @Delete()
  @ApiOperation({
    summary: 'Delete all users',
  })
  async deleteAllUsers() {
    return await this.userService.deleteAllUsers();
  }

  @UseGuards(AccessTokenGuard)
  @Delete('/:id')
  @ApiOperation({
    summary: 'Delete one specific user',
  })
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }

  @UseGuards(AccessTokenGuard)
  @Patch()
  @ApiOperation({
    summary: 'Update one specific user',
  })
  async updateUser(@Body() updateUserDto: UpdateUserDto) {
    return await this.userService.updateUser(updateUserDto);
  }

  // @UseGuards(AccessTokenGuard)
  @Post()
  @ApiOperation({
    summary: 'Create user',
  })
  async createUser(@Body() userDto: UserDto, @Req() req: Request) {
    req.user;
    return await this.userService.createUser(userDto);
  }
}
