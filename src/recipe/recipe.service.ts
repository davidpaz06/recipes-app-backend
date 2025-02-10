import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateRecipeDto } from './dto/createRecipe.dto';

@Injectable()
export class RecipeService {
  constructor(private prisma: PrismaService) {}

  async getRecipes() {
    const recipes = await this.prisma.recipe.findMany();
    return recipes;
  }

  getRecipe(id: number) {
    const recipeFound = this.prisma.recipe.findUnique({
      where: { id },
    });

    return recipeFound;
  }

  async createRecipe(recipe: CreateRecipeDto) {
    const { title, description, ingredients, prepTime, createdById, imageUrl } =
      recipe;
    const newRecipe = await this.prisma.recipe.create({
      data: {
        title,
        description,
        ingredients,
        prepTime,
        createdById: {
          connect: { userId: createdById },
        },
        imageUrl: imageUrl ?? 'default-image-url.jpg', // Proveer un valor por defecto si imageUrl es undefined
      },
    });
    const res = {
      message: 'Recipe created successfully',
      recipe: newRecipe,
    };
    return res;
  }
}
