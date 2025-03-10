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
  UseGuards,
  Request,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { AuthGuard } from 'src/user/guard/auth.guard';
import { CreateRecipeDto } from './dto/createRecipe.dto';
import { LoggerInterceptor } from 'src/user/logger/logger.interceptor';
import { ResponseInterceptor } from 'src/user/interceptors/response/response.interceptor';

@Controller('/recipes')
@UseInterceptors(LoggerInterceptor)
@UseGuards(AuthGuard)
// @UseInterceptors(ResponseInterceptor)
export class RecipeController {
  constructor(private recipeService: RecipeService) {}

  @Get()
  @HttpCode(200)
  getRecipes(@Query() query: any) {
    return this.recipeService.getRecipes();
  }

  @Get('/user')
  getUserRecipes(@Request() req) {
    const userId = req.user.sub;
    return this.recipeService.getUserRecipes(userId);
  }

  @Get('/:id')
  getRecipe(@Param('id', ParseIntPipe) id: number) {
    return this.recipeService.getRecipe(id);
  }

  @Get('/:id/steps')
  getRecipeSteps(@Param('id', ParseIntPipe) id: number) {
    return this.recipeService.getRecipeSteps(id);
  }

  @Post()
  @HttpCode(201)
  @UsePipes(new ValidationPipe())
  createRecipe(@Body() recipe: CreateRecipeDto) {
    return this.recipeService.createRecipe(recipe);
  }

  @Post('/delete/:id')
  @HttpCode(204)
  deleteRecipe(@Param('id', ParseIntPipe) id: number) {
    return this.recipeService.deleteRecipe(id);
  }

  @Get('notfound')
  @HttpCode(404)
  notFound() {
    return '404 Not found';
  }
}
