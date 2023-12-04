import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from '../appConfig/appConfig.module';
import { AppConfigService } from '../appConfig/appConfig.service';
import { EConfigKeys } from 'src/config';
import { entities } from '../../db/entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      useFactory: (config: AppConfigService) => ({
        type: 'postgres',
        host: config.get(EConfigKeys.DB_HOST),
        port: config.get(EConfigKeys.DB_PORT),
        database: config.get(EConfigKeys.DB_NAME),
        username: config.get(EConfigKeys.DB_USER),
        password: config.get(EConfigKeys.DB_PASSWORD),
        logging: false,
        synchronize: false,
        migrationsRun: false,
        entities,
      }),
      inject: [AppConfigService],
    }),
  ],
})
export class AppTypeormModule {}
