import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class PaySheetDto {
  @ApiProperty()
  @IsNumber()
  baseSalary: number;

  @ApiProperty()
  @IsNumber()
  advanceOnSalary: number;

  @IsOptional()
  @ApiProperty()
  @IsString()
  userId: string;
}

export class UpdatePaySheetDto {
  @ApiProperty()
  @IsString()
  id: string;

  @IsOptional()
  @ApiProperty()
  @IsNumber()
  baseSalary?: number;

  @IsOptional()
  @ApiProperty()
  @IsNumber()
  advanceOnSalary?: number;
}
