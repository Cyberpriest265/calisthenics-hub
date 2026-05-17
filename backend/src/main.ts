import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common' // 1. Add this import 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Allow requests from the Next.js frontend
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  //2. Add this line to enable the "Bouncer" globally
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,// Strips away any data that is NOT in the DTO
    forbidNonWhitelisted: true, // Throws error if extra data is sent
    transform: true, // Automatically transforms string params to number
  }))

  // Use PORT from .env file, fall back to 3001 if not set
  // parseInt() converts the string "3001" to a number
  const port = parseInt(process.env.PORT || '3001', 10);

  await app.listen(port);

  // Log the URL so you always know where the server is running
  console.log(`🚀 Server running on: http://localhost:${port}`);
  console.log(`📋 Environment: ${process.env.NODE_ENV}`);
}

bootstrap();
