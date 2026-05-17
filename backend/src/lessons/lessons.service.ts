import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLessonDto } from './dto/create-lesson.dto';

@Injectable()
export class LessonsService {
    constructor(private prisma: PrismaService) { }

    // CREATE a lesson inside a course
    async create(courseId: string, dto: CreateLessonDto) {
        // First, verify the course exists
        const course = await this.prisma.course.findUnique({ where: { id: courseId } });
        if (!course) throw new NotFoundException(`Course ${courseId} not found`);

        return this.prisma.lesson.create({
            data: { ...dto, courseId },
        });
    }

    // GET all lessons for a course
    findAll(courseId: string) {
        return this.prisma.lesson.findMany({
            where: { courseId },
            orderBy: { position: 'asc' }, // Always return in the correct order
        });
    }

    // DELETE a lesson
    async remove(id: string) {
        const lesson = await this.prisma.lesson.findUnique({ where: { id } });
        if (!lesson) throw new NotFoundException(`Lesson ${id} not found`);
        return this.prisma.lesson.delete({ where: { id } });
    }
}
