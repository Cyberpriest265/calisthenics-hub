import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }

    async register(dto: RegisterDto) {
        // 1. Check if the user already exists
        const userExists = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });

        if (userExists) {
            throw new ConflictException('A user with this email already exists');
        }

        // 2. Hash the password (Salting it 10 times)
        const hashedPassword = await bcrypt.hash(dto.password, 10);

        // 3. Save the user to the database
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                name: dto.name,
                password: hashedPassword,
            },
        });

        // 4. Remove the password from the returned object (Security!)
        const { password, ...result } = user;
        return result;
    }
}