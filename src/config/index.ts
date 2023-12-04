import { Expose, Type, plainToClass } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import 'reflect-metadata';
import * as dotenv from 'dotenv';

dotenv.config();

export class ConfigDto {
  @Type(() => Number)
  @Expose()
  @IsInt()
  @IsNotEmpty()
  APP_PORT!: number;

  @Expose()
  @IsString()
  @IsNotEmpty()
  DB_HOST!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  DB_NAME!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  DB_PASSWORD!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  DB_USER!: string;

  @Type(() => Number)
  @Expose()
  @IsInt()
  @IsNotEmpty()
  DB_PORT!: number;

  @Expose()
  @IsString()
  @IsNotEmpty()
  JWT_ACCESS_SECRET!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  JWT_REFRESH_SECRET!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  APP_HOST!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  ENCRYPTION_KEY!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  IV!: string;
}

export enum EConfigKeys {
  APP_PORT = 'APP_PORT',
  DB_HOST = 'DB_HOST',
  DB_NAME = 'DB_NAME',
  DB_PASSWORD = 'DB_PASSWORD',
  DB_USER = 'DB_USER',
  DB_PORT = 'DB_PORT',
  JWT_ACCESS_SECRET = 'JWT_ACCESS_SECRET',
  JWT_REFRESH_SECRET = 'JWT_REFRESH_SECRET',
  APP_HOST = 'APP_HOST',
  ENCRYPTION_KEY = 'ENCRYPTION_KEY',
  IV = 'IV',
}

export const getConfig = (): ConfigDto => {
  const config = plainToClass(ConfigDto, process.env, {
    enableImplicitConversion: true,
    excludeExtraneousValues: true,
  });

  return config;
};
