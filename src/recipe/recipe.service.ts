import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateRecipeDto } from './dto/createRecipe.dto';

@Injectable()
export class RecipeService {
  constructor(private prisma: PrismaService) {}

  async getRecipes() {
    const recipes = await this.prisma.recipe.findMany({
      orderBy: [{ createdAt: 'desc' }, { id: 'asc' }],
    });
    return recipes;
  }

  getRecipe(id: number) {
    const recipeFound = this.prisma.recipe.findUnique({
      where: { id },
    });

    return recipeFound;
  }

  async getUserRecipes(id: number) {
    const userRecipes = await this.prisma.recipe.findMany({
      where: { createdBy: id },
    });

    if (!userRecipes) {
      throw new NotFoundException('User has no recipes');
    }

    return userRecipes;
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
        createdAt: new Date(),
        imageUrl: imageUrl ?? 'default-image-url.jpg',
      },
    });
    const res = {
      message: 'Recipe created successfully',
      recipe: newRecipe,
    };
    return res;
  }
}
