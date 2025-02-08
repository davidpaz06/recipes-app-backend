import {
  IsString,
  IsInt,
  IsArray,
  MinLength,
  ArrayMinSize,
  IsNumber,
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

  id: number;
}
