import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserRequest } from './dto/request/user.create.request.dto';
import { CreateUserResponse } from './dto/response/create-user.response.dto';
import { Role, User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  // 일반 사용자를 등록하는 메소드
  async registerUser(
    createUserRequest: CreateUserRequest,
  ): Promise<CreateUserResponse> {
    // 비밀번호 해싱
    const hashedRequest: CreateUserRequest =
      await createUserRequest.getHashedRequest();

    const user = hashedRequest.toEntity(Role.USER);

    const createdUser = await this.userRepository.create(user);

    return CreateUserResponse.fromEntity(createdUser);
  }
}
