import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('courses/:courseId/lessons') // Nested route!
export class LessonsController {
    constructor(private lessonsService: LessonsService) { }

    // 🌐 PUBLIC — Students can see the lesson list
    @Get()
    findAll(@Param('courseId') courseId: string) {
        return this.lessonsService.findAll(courseId);
    }

    // 🔒 ADMIN ONLY
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('ADMIN')
    @Post()
    create(@Param('courseId') courseId: string, @Body() dto: CreateLessonDto) {
        return this.lessonsService.create(courseId, dto);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('ADMIN')
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.lessonsService.remove(id);
    }
}
