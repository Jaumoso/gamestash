import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {

  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'] // log fatal error warn debug verbose
  });

  const swaggerConfig = new DocumentBuilder()
  .setTitle('GameStash')
  .setDescription('GameStash API documentation.')
  .setVersion('1.0')
  .setContact('Jaume C', 'https://github.com/Jaumoso', 'jaumecvr2000@gmail.com')
  .addBearerAuth()
  .build();
  const swaggerOptions: SwaggerDocumentOptions = {
    deepScanRoutes: true,
    operationIdFactory: (
      controllerKey: string,
      methodKey: string
    ) => methodKey
  };

  const globalPrefix = 'v1';
  app.setGlobalPrefix(globalPrefix)

  app.use(helmet());

  const swaggerCustomOptions: SwaggerCustomOptions = {
    customSiteTitle: 'GameDB API Docs',
    useGlobalPrefix: true
  }
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig, swaggerOptions)
  SwaggerModule.setup('api', app, swaggerDocument, swaggerCustomOptions);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
  Logger.log(`Swagger API available at http://localhost:${port}/${globalPrefix}/api`)
}

bootstrap();
