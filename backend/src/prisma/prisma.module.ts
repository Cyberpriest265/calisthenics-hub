import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
// This makes PrismaService available everywhere without re-importing
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
  // Share it with other modules
})
export class PrismaModule { }
