import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('Gestion pfe')
    .setDescription("Description de l'API de gestion des pfes")
    .setVersion('1.0')
    .addTag('pfes')
    .addTag('sessions')
    .addTag('soutenances')
    .addTag('annee-universitaires')
    .addTag('suggest-pfe')
    .addTag('utilisateurs')
    .addTag('authentification')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('', app, document);
  app.enableCors(); // protection
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  await app.listen(process.env.PORT || '80');
}
bootstrap();
