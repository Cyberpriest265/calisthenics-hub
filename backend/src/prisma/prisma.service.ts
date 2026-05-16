import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    // OnModuleInit is a "Lifecycle Hook"
    // It runs automatically when the backend starts up
    async onModuleInit() {
        // This establishes the actual connection to PostgreSQL
        await this.$connect();
    }
}
