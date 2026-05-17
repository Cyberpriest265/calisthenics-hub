import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  // CREATE
  create(dto: CreateCourseDto) {
    return this.prisma.course.create({ data: dto });
  }

  // READ ALL (public — published only)
  findAll() {
    return this.prisma.course.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  // READ ALL (admin — includes unpublished + lesson count)
  findAllAdmin() {
    return this.prisma.course.findMany({
      include: { _count: { select: { lessons: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  // READ ONE
  async findOne(id: string) {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: { lessons: { orderBy: { position: 'asc' } } },
    });

    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return course;
  }

  // UPDATE
  async update(id: string, dto: UpdateCourseDto) {
    await this.findOne(id);
    return this.prisma.course.update({ where: { id }, data: dto });
  }

  // DELETE
  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.course.delete({ where: { id } });
  }

  // PUBLISH
  async publish(id: string) {
    await this.findOne(id);
    return this.prisma.course.update({
      where: { id },
      data: { isPublished: true },
    });
  }

  // UNPUBLISH
  async unpublish(id: string) {
    await this.findOne(id);
    return this.prisma.course.update({
      where: { id },
      data: { isPublished: false },
    });
  }
}
