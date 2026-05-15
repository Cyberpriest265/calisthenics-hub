import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Use PORT from .env file, fall back to 3001 if not set
  // parseInt() converts the string "3001" to a number
  const port = parseInt(process.env.PORT || '3001', 10);

  await app.listen(port);

  // Log the URL so you always know where the server is running
  console.log(`🚀 Server running on: http://localhost:${port}`);
  console.log(`📋 Environment: ${process.env.NODE_ENV}`);
}

bootstrap();
