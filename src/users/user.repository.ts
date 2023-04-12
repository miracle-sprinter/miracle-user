import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  // 사용자를 등록하는 메소드
  async create(user: User): Promise<User> {
    const createdUser = await this.prisma.user.create({
      data: user,
    });

    return createdUser;
  }

  // 이메일에 대응하는 유저를 가져오는 메소드
  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    return user;
  }

  // 닉네임을 기반으로 유저를 가져오는 메소드
  async findByNickname(nickname: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        nickname: nickname,
      },
    });

    return user;
  }
}
