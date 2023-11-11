import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class EmailLoginDto {
  @Expose()
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  password!: string;
}

export class EmailSignupDto {
  @Expose()
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  password!: string;
}
