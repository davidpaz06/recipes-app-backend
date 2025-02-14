import { Module } from '@nestjs/common';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [RecipeController],
  providers: [RecipeService, PrismaService],
  exports: [RecipeService],
})
export class RecipeModule {}
