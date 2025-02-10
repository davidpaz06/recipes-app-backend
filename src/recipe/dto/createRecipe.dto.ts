import {
  IsString,
  IsInt,
  IsArray,
  MinLength,
  ArrayMinSize,
  IsDate,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateRecipeDto {
  @IsString()
  @MinLength(3)
  title: string;

  @IsString()
  description: string;

  @IsString()
  ingredients: string;

  @IsInt()
  prepTime: number;

  @IsInt()
  createdById: number;

  @IsDate()
  createdAt: Date;

  @IsString()
  @IsOptional()
  imageUrl?: any;
}
