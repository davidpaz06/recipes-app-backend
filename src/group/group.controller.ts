import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  UseInterceptors,
  UseGuards,
  Req,
  Request,
} from '@nestjs/common';
import { LoggerInterceptor } from 'src/user/logger/logger.interceptor';
import { AuthGuard } from 'src/user/guard/auth.guard';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';

@Controller('groups')
@UseInterceptors(LoggerInterceptor)
@UseGuards(AuthGuard)
export class GroupController {
  constructor(private groupService: GroupService) {}

  @Get()
  getUserGroups(@Request() req) {
    console.log('GET GROUPS ROUTE');
    const userId = req.user.sub;
    return this.groupService.getUserGroups(userId);
  }

  @Get('recipes')
  getGroupRecipes(@Body() body: { groupId: number }) {
    const { groupId } = body;
    return this.groupService.getGroupRecipes(groupId);
  }

  @Post('create')
  createGroup(@Body() group: CreateGroupDto) {
    return this.groupService.createGroup(group);
  }

  @Post('add')
  addToGroup(@Body() body: { groupId: number; recipeId: number }) {
    const { groupId, recipeId } = body;
    return this.groupService.addToGroup(groupId, recipeId);
  }

  @Delete('recipes')
  removeFromGroup(@Body() body: { groupId: number; recipeId: number }) {
    const { groupId, recipeId } = body;
    return this.groupService.removeFromGroup(groupId, recipeId);
  }

  @Delete()
  deleteGroup(@Body() body: { groupId: number }) {
    const { groupId } = body;
    return this.groupService.deleteGroup(groupId);
  }
}
