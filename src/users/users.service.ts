import { HttpException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserRequest } from './dto/request/user.create.request.dto';
import { CreateUserResponse } from './dto/response/create-user.response.dto';
import { Role } from '@prisma/client';
import { UserValidator } from './user.validator';
import { ValidationResult } from 'src/common/results/validate.result';
import { LoginRequest } from './dto/request/user.login.request.dto';
import { LoginResponse } from './dto/response/user.login.response.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './dto/request/jwt.payload.dto';
import { ReadUserResponse } from './dto/response/read.user.response.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly userValidator: UserValidator,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
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

  // 로그인을 처리하는 메소드
  async login(loginRequest: LoginRequest): Promise<LoginResponse> {
    const { email, password } = loginRequest;

    const foundUser = await this.userRepository.findByEmail(email);

    if (!foundUser) {
      throw new HttpException('이메일 혹은 패스워드를 다시 확인해주세요', 400);
    }

    const isPasswordValid = await bcrypt.compare(password, foundUser.password);

    if (!isPasswordValid) {
      throw new HttpException('이메일 혹은 패스워드를 다시 확인해주세요', 400);
    }

    const jwtPayload: JwtPayload = {
      id: foundUser.id,
      email: foundUser.email,
      role: foundUser.role,
    };

    return new LoginResponse(this.jwtService.sign(jwtPayload));
  }

  // 사용자의 프로파일을 조회하는 메소드
  async getProfileFromJwtPayload(
    jwtPayload: JwtPayload,
  ): Promise<ReadUserResponse> {
    const { id } = jwtPayload;

    const foundUser = await this.userRepository.findById(id);

    if (!foundUser) {
      throw new HttpException('올바르지 않은 접근입니다', 403);
    }

    return ReadUserResponse.fromEntity(foundUser);
  }
}
