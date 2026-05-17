import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateLessonDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    videoUrl: string;

    @IsNumber()
    @Min(1)
    position: number; // Order of the lesson in the course (1, 2, 3...)
}
