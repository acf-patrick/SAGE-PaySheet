import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user: User = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...res } = user;
      return res;
    }

    return null;
  }

  async login(user: { username: string }) {
    const payload = {
      username: user.username,
    };

    return {
      ...user,
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '1d' }),
    };
  }

  async refreshToken(token: { refresh: string }) {
    const payload = {
      refresh: token.refresh,
    };

    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '10s' }),
    };
  }
}
