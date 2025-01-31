import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecipeDto } from './dto/createRecipe.dto';

@Injectable()
export class RecipeService {
  private recipes: { id: number; [key: string]: any }[] = [];

  getRecipes() {
    return this.recipes;
  }

  getRecipe(id: number) {
    const recipeFound = this.recipes.find((recipe) => recipe.id === id);

    if (!recipeFound) {
      throw new NotFoundException('Recipe not found');
    }

    return recipeFound;
  }

  createRecipe(recipe: CreateRecipeDto) {
    const newRecipe = { ...recipe, id: this.recipes.length + 1 };
    this.recipes.push(newRecipe);
    return newRecipe;
  }
}
