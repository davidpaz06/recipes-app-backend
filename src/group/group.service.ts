import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateGroupDto } from './dto/create-group.dto';

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) {}

  async getUserGroups(user: number) {
    const groups = await this.prisma.group.findMany({
      where: { groupBy: user },
    });

    return groups;
  }

  async getGroupRecipes(group: number) {
    const groupWithRecipes = await this.prisma.group.findUnique({
      where: { id: group },
      include: {
        groupRecipes: {
          include: {
            recipe: true,
          },
        },
      },
    });

    if (!groupWithRecipes) {
      throw new Error('Group not found');
    }

    return groupWithRecipes.groupRecipes.map((gr) => gr.recipe);
  }

  async createGroup(group: CreateGroupDto) {
    const { name, groupBy } = group;
    const newGroup = await this.prisma.group.create({
      data: {
        name,
        groupBy,
      },
    });
    return newGroup;
  }

  async addToGroup(groupId: number, recipeId: number) {
    const existingRelation = await this.prisma.group_Recipe.findFirst({
      where: {
        groupId: groupId,
        recipeId: recipeId,
      },
    });

    if (existingRelation) {
      throw new HttpException('Recipe already in group', HttpStatus.CONFLICT);
    }

    const newGroup = await this.prisma.group_Recipe.create({
      data: {
        groupId,
        recipeId,
      },
    });
    return newGroup;
  }

  async removeFromGroup(groupId: number, recipeId: number) {
    await this.prisma.group_Recipe.deleteMany({
      where: {
        groupId: groupId,
        recipeId: recipeId,
      },
    });

    return 'Recipe removed from group';
  }

  async deleteGroup(groupId: number) {
    await this.prisma.group_Recipe.deleteMany({
      where: {
        groupId: groupId,
      },
    });

    await this.prisma.group.delete({
      where: {
        id: groupId,
      },
    });

    return 'Group deleted';
  }
}
