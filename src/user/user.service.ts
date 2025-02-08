import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { PrismaService } from 'prisma/prisma.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  getUsers() {
    return this.prisma.user.findMany();
  }

  async createUser(user) {
    try {
      const hashedPassword = await argon2.hash(user.password);

      const newUser = await this.prisma.user.create({
        data: {
          ...user,
          password: hashedPassword,
        },
      });
      return newUser;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new HttpException('User already exists', HttpStatus.CONFLICT);
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async login(req, res) {
    const user = await this.prisma.user.findUnique({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid = await argon2.verify(
      user.password,
      req.body.password,
    );

    if (!isPasswordValid) {
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }

    return {
      status: res.status(HttpStatus.OK).json({ message: 'Login successful' }),
      user: user,
    };
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
