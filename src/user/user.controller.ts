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
  UseInterceptors,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { ValidateuserPipe } from './pipes/validateuser/validateuser.pipe';
import { AuthGuard } from './guard/auth.guard';
import { LoggerInterceptor } from './logger/logger.interceptor';
import { ResponseInterceptor } from './interceptors/response/response.interceptor';

@Controller('/users')
@UseInterceptors(LoggerInterceptor)
@UseInterceptors(ResponseInterceptor)
@UseGuards(AuthGuard)
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

  @Post('login')
  @HttpCode(200)
  login(@Body() user: CreateUserDto) {
    const res = this.userService.login(user);
    return res;
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

  @Patch()
  updateUser(@Body() body: { oldUsername: string; newUsername: string }) {
    const { oldUsername, newUsername } = body;

    const res = this.userService.updateUser(oldUsername, newUsername);
    return {
      status: HttpStatus.OK,
      message: `New username: ${newUsername}`,
    };
  }

  @Delete()
  deleteUser() {
    return this.userService.deleteUser();
  }
}
