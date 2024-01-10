import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { UserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

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
    const user: Omit<User, 'password'> = await this.authService.validateUser(
      loginDto.username,
      loginDto.password,
    );

    if (!user) {
      throw new UnauthorizedException('Credentials error');
    }

    return await this.authService.login(user);
  }

  @Post('register')
  @ApiOperation({ summary: 'Register new user' })
  async register(@Body() user: UserDto) {
    return await this.userService.createUser(user);
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh token of current user' })
  async refreshToken(@Body() token: { refresh: string }) {
    return await this.authService.refreshToken(token);
  }
}
