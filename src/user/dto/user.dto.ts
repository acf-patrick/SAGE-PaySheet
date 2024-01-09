import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  id: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  name?: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  lastName?: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  username?: string;

  @IsOptional()
  @ApiProperty({ enum: Role, enumName: 'Role' })
  @IsEnum(Role)
  role?: Role;
}

export class UserDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsString()
  username: string;

  @IsOptional()
  @ApiProperty({ enum: Role, enumName: 'Role' })
  @IsEnum(Role)
  role?: Role;
}
