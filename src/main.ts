import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { getConfig } from './config';
import dataSource from './db/dataSource';
import { constants } from './config/constants';

const config = getConfig();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'fatal', 'verbose'],
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('AlphaGuilty documentation page')
    .setDescription('There is auto documentation')
    .setVersion('v1')
    .addServer(config.APP_HOST, 'Local server')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      constants.authPatternName,
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  await dataSource.initialize();

  await app.listen(config.APP_PORT);
}
bootstrap();
