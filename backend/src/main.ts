import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);



  // I would include this in the .env for production
  app.enableCors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true,
  });


  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true, 
    }),
  );


  const config = new DocumentBuilder()
    .setTitle('Track Submission API')
    .setDescription('API for track submission and feedback flow')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Start the server on port 4000 
  await app.listen(process.env.PORT ?? 4000, () => {
    console.log(`Server running on port ${process.env.PORT ?? 4000}`);
  });
}

bootstrap();