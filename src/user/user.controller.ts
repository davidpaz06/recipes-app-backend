import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Req,
  Res,
  Body,
  Query,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { ValidateuserPipe } from './pipes/validateuser/validateuser.pipe';
import { AuthGuard } from './guard/auth/auth.guard';
import { LoggerInterceptor } from './logger/logger.interceptor';

@Controller('/users')
@UseInterceptors(LoggerInterceptor)
@ApiTags('Users')
@ApiResponse({ status: 200, description: 'Success' })
@ApiResponse({ status: 401, description: 'Unauthorized' })
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  getUsers() {
    return this.userService.getUsers();
  }

  @Post()
  createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }

  @Get('greet')
  @UseGuards(AuthGuard)
  greet(
    @Query(ValidateuserPipe)
    query: {
      name: string;
      age: number;
      status: boolean;
    },
  ) {
    return `Hello ${query.name}, you are ${query.age} years old and your status is ${query.status}`;
  }

  @Put()
  updateUser() {
    return this.userService.updateUser();
  }

  @Delete()
  deleteUser() {
    return this.userService.deleteUser();
  }

  @Patch()
  patchUser() {
    return this.userService.patchUser();
  }
}
