import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@Controller('auth') // All routes in here start with /auth
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register') // This makes the route: POST /auth/register
    async register(@Body() dto: RegisterDto) {
        return this.authService.register(dto);
    }
}
