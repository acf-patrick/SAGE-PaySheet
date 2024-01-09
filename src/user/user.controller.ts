import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto, UserDto } from './dto/user.dto';

@ApiTags('👤 Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all users',
  })
  async getPaySheets() {
    return await this.userService.getUsers();
  }

  @Get('/search/')
  @ApiOperation({
    summary: 'Get one specific user',
  })
  async getPaySheetsByKeyWord(@Query('keyword') keyword: string) {
    return await this.userService.getUsersByKeyWord(keyword);
  }

  @Delete()
  @ApiOperation({
    summary: 'Delete all users',
  })
  async deleteAllUsers() {
    return await this.userService.deleteAllUsers();
  }

  @Delete()
  @ApiOperation({
    summary: 'Delete one specific user',
  })
  async deleteUser(@Query('id') id: string) {
    return await this.userService.deleteUser(id);
  }

  @Patch()
  @ApiOperation({
    summary: 'Update one specific user',
  })
  async updateUser(@Body() updateUserDto: UpdateUserDto) {
    return await this.userService.updateUser(updateUserDto);
  }

  @Post()
  @ApiOperation({
    summary: 'Create user',
  })
  async createUser(@Body() userDto: UserDto) {
    return await this.userService.createUser(userDto);
  }
}
