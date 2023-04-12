import { HttpException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserRequest } from './dto/request/user.create.request.dto';
import { CreateUserResponse } from './dto/response/create-user.response.dto';
import { Role } from '@prisma/client';
import { UserValidator } from './user.validator';
import { CommonErrors } from 'src/common/results/errors';
import { ValidationResult } from 'src/common/results/validate.result';

@Injectable()
export class UsersService {
  constructor(
    private readonly userValidator: UserValidator,
    private readonly userRepository: UserRepository,
  ) {}

  // 일반 사용자를 등록하는 메소드
  async registerUser(
    createUserRequest: CreateUserRequest,
  ): Promise<CreateUserResponse> {
    // 먼저 해당 유저가 등록 가능인지 검증
    const validationResult: ValidationResult =
      await this.userValidator.isCreatable(createUserRequest);

    if (!validationResult.success) {
      throw new HttpException(validationResult.message, 400);
    }

    // 비밀번호 해싱
    const hashedRequest: CreateUserRequest =
      await createUserRequest.getHashedRequest();

    const user = hashedRequest.toEntity(Role.USER);

    const createdUser = await this.userRepository.create(user);

    return CreateUserResponse.fromEntity(createdUser);
  }

  // 관리자를 등록하는 메소드
  async registerAdmin(
    createUserRequest: CreateUserRequest,
  ): Promise<CreateUserResponse> {
    // 먼저 해당 유저가 등록 가능인지 검증
    const validationResult: ValidationResult =
      await this.userValidator.isCreatable(createUserRequest);

    if (!validationResult.success) {
      throw new HttpException(validationResult.message, 400);
    }

    // 비밀번호 해싱
    const hashedRequest: CreateUserRequest =
      await createUserRequest.getHashedRequest();

    const user = hashedRequest.toEntity(Role.ADMIN);

    const createdUser = await this.userRepository.create(user);

    return CreateUserResponse.fromEntity(createdUser);
  }
}
