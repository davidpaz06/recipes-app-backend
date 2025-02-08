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
    const { title, description, ingredients, prepTime, createdById } = recipe;
    const newRecipe = await this.prisma.recipe.create({
      data: {
        title,
        description,
        ingredients,
        prepTime,
        createdById: {
          connect: { userId: createdById },
        },
      },
    });
    return newRecipe;
  }
}
