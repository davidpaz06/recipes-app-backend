import { IsString, IsArray, MinLength, ArrayMinSize } from 'class-validator';

export class CreateRecipeDto {
  @IsString()
  @MinLength(3)
  title: string;

  @IsArray()
  @ArrayMinSize(1)
  ingredients: object[];

  id: number;
}
