import { MiddlewareConsumer, Module } from '@nestjs/common';
import { HealthCheckModule } from '../healthcheck/healthcheck.module';
import { AuthModule } from '../auth/auth.module';
import { AppLoggerMiddleware } from './app.middleware';
import { UsersModule } from '../user/user.module';

@Module({
  imports: [HealthCheckModule, AuthModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
