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
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('', app, document);
  app.enableCors(); // protection
  await app.listen(process.env.PORT || '80');
}
bootstrap();
