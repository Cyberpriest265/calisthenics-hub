import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    constructor() {

        //1. Create a connection pool using the 'pg' Library 
        const pool = new Pool({ connectionString: process.env.DATABASE_URL })

        //2. Create the prisma adapter
        const adapter = new PrismaPg(pool);

        //3. Pass the adapter to the PrismaClient 
        super({ adapter });

    }
    // OnModuleInit is a "Lifecycle Hook"
    // It runs automatically when the backend starts up
    async onModuleInit() {
        // This establishes the actual connection to PostgreSQL
        await this.$connect();
    }
}
