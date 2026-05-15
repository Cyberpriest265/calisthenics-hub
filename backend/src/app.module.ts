import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // ConfigModule.forRoot() reads your .env file and makes all
    // variables available globally via process.env
    // isGlobal: true means you don't need to re-import ConfigModule
    // in every feature module — it's available everywhere automatically
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }