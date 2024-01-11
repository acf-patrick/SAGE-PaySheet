import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { jwtDecode } from 'jwt-decode';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
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

  async login(user: Omit<User, 'password'>) {
    const payload = {
      username: user.username,
      userId: user.id,
    };

    return {
      user,
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, {
        expiresIn: this.configService.get<string>(
          'JWT_REFRESH_EXPIRTION_DELTA',
        ),
      }),
    };
  }

  isTokenExpired = (token: string | null) => {
    if (!token) {
      return true;
    }

    try {
      const decodedToken = jwtDecode(token) as { exp: number };
      return decodedToken.exp < Date.now() / 1000;
    } catch (error) {
      console.error('Error decoding token:', error);
      return true;
    }
  };

  async refreshToken(token: { refresh: string | null }) {
    const payload = {
      refresh: token.refresh,
    };

    if (this.isTokenExpired(token.refresh)) {
      return {
        error: 'Refresh token expired',
      };
    }

    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRTION_DELTA'),
      }),
    };
  }
}
