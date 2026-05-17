import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class UpdateCourseDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    @Min(0)
    @IsOptional()
    price?: number;

    @IsString()
    @IsOptional()
    thumbnail?: string;

    @IsOptional()
    isPublished?: boolean;
}
