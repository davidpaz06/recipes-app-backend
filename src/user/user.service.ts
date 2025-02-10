import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { PrismaService } from 'prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private auth: AuthService,
  ) {}

  getUsers() {
    return this.prisma.user.findMany();
  }

  async createUser(user) {
    try {
      const hashedPassword = await argon2.hash(user.password, {
        // Tipo de algoritmo (argon2i, argon2d, argon2id)
        type: argon2.argon2id,
        memoryCost: 2 ** 10, // Memoria utilizada en KiB (4096 KiB = 4 MiB)
        timeCost: 2, // Número de iteraciones
        parallelism: 2, // Grado de paralelismo
      });
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

  async login(req) {
    const user = await this.prisma.user.findUnique({
      where: {
        username: req.username,
      },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid = await argon2.verify(user.password, req.password);

    if (!isPasswordValid) {
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }

    const tokens = await this.auth.tokenize(user);

    return {
      ...tokens,
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
