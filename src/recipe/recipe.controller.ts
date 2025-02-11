import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UsePipes,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/createRecipe.dto';
import { LoggerInterceptor } from 'src/user/logger/logger.interceptor';
import { ResponseInterceptor } from 'src/user/interceptors/response/response.interceptor';

@Controller('/recipes')
@UseInterceptors(LoggerInterceptor)
// @UseInterceptors(ResponseInterceptor)
export class RecipeController {
  constructor(private recipeService: RecipeService) {}

  @Get()
  @HttpCode(200)
  getRecipes(@Query() query: any) {
    return this.recipeService.getRecipes();
  }

  @Get('/:id')
  getRecipe(@Param('id', ParseIntPipe) id: number) {
    return this.recipeService.getRecipe(id);
  }

  @Post()
  @HttpCode(201)
  @UsePipes(new ValidationPipe())
  createRecipe(@Body() recipe: CreateRecipeDto) {
    return this.recipeService.createRecipe(recipe);
  }

  @Get('notfound')
  @HttpCode(404)
  notFound() {
    return '404 Not found';
  }
}
