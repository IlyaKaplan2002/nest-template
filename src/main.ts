import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { getConfig } from './config';
import { constants } from './config/constants';
import { createAgent } from '@forestadmin/agent';
import { createSqlDataSource } from '@forestadmin/datasource-sql';

const config = getConfig();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'fatal', 'verbose'],
  });

  const agent = createAgent({
    authSecret: config.FOREST_AUTH_SECRET,
    envSecret: config.FOREST_ENV_SECRET,
    isProduction: false,
    typingsPath: './typings.ts',
    typingsMaxDepth: 5,
  }).addDataSource(
    createSqlDataSource({
      dialect: 'postgres',
      database: config.DB_NAME,
      host: config.DB_HOST,
      username: config.DB_USER,
      port: config.DB_PORT,
      password: config.DB_PASSWORD,
    }),
  );

  await agent.mountOnNestJs(app).start();

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

  // await dataSource.initialize();

  await app.listen(config.APP_PORT);
}
bootstrap();
