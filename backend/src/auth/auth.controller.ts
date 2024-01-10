import { Body, Controller, ForbiddenException, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

@ApiTags('🔒 Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
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
      throw new ForbiddenException('Credentials error');
    }

    return {
      access_token: this.jwtService.sign({ username: loginDto.username }),
      user,
    };
  }
}
