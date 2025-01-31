import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  getUsers() {
    return this.prisma.user.findMany();
  }

  async createUser(user: CreateUserDto) {
    console.log('Fetching users from database');
    const users = await this.prisma.user.findMany();
    console.log('Users fetched:', users);
    return users;
  }

  updateUser() {
    return 'User updated';
  }

  deleteUser() {
    return 'User deleted';
  }

  patchUser() {
    return 'User patched';
  }
}
