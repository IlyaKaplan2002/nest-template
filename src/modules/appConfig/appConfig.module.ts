import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { ConfigDto } from 'src/config';
import { AppConfigService } from './appConfig.service';

const validate = (config: Record<string, unknown>) => {
  const validatedConfig = plainToInstance(ConfigDto, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
};

@Module({
  imports: [ConfigModule.forRoot({ validate })],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
