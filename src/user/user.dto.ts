import { IsString, IsDate, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsString()
  username: string;

  @IsDate()
  birthdate: Date;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  surname?: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsDate()
  birthdate?: Date;
}
