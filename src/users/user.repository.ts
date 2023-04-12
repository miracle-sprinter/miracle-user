import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserRequest } from './dto/request/user.create.request.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  // 사용자를 등록하는 메소드
  async create(user: User): Promise<User> {
    const createdUser = this.prisma.user.create({
      data: user,
    });

    return createdUser;
  }
}
