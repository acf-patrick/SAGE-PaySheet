import {
  Body,
  Controller,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { UserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { RefreshTokenGuard } from './guards/refresh_token.guard';

@ApiTags('🔒 Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('login')
  @ApiOperation({
    description: 'Generate acces token and refresh token for valid credentials',
    summary: 'Sign in user',
  })
  async login(@Body() loginDto: { username: string; password: string }) {
    const user = await this.authService.validateUser(
      loginDto.username,
      loginDto.password,
    );

    if (!user) {
      console.log('Credentials error');
      return user;
    }

    return await this.authService.login(user);
  }

  @Post('signup')
  @ApiOperation({ summary: 'Register new user' })
  async register(@Body() user: UserDto) {
    return await this.userService.createUser(user);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @ApiOperation({ summary: 'Refresh token of current user' })
  async refreshToken(@Req() req: Request) {
    return await this.authService.refreshToken({
      refresh: req.headers.authorization?.split(' ')[1],
    });
  }
}
