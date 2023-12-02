import { MiddlewareConsumer, Module } from '@nestjs/common';
import { HealthCheckModule } from '../healthcheck/healthcheck.module';
import { AuthModule } from '../auth/auth.module';
import { AppLoggerMiddleware } from './app.middleware';
import { UsersModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConfig } from 'src/config';
import { entities } from '../../db/entity';

const config = getConfig();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config.DB_HOST,
      port: config.DB_PORT,
      database: config.DB_NAME,
      username: config.DB_USER,
      password: config.DB_PASSWORD,
      logging: false,
      synchronize: false,
      migrationsRun: false,
      entities,
    }),
    HealthCheckModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
