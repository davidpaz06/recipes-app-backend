import {
  IsString,
  IsInt,
  IsArray,
  MinLength,
  ArrayMinSize,
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

  @IsString()
  @IsOptional()
  imageUrl?: any;
}
