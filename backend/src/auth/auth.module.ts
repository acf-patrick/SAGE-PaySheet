import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { ConfigService } from '@nestjs/config';
import { AccessTokenStrategy } from './access_token.strategy';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: 60,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, UserService, AccessTokenStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
