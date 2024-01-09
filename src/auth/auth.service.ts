import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = this.prisma.user.findFirst({
      where: {
        username,
      },
    });
    return user;
  }
}
