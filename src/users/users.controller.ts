import { CreateUserRequest } from './dto/request/user.create.request.dto';
import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { ResultFactory } from 'src/common/results/results.factory';
import { LoginRequest } from './dto/request/user.login.request.dto';

@Controller('api/auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // 일반 유저 가입
  @Post('/sign-up/user')
  async registerUser(@Body() createUserRequest: CreateUserRequest) {
    const createUserResponse = await this.usersService.registerUser(
      createUserRequest,
    );

    return ResultFactory.getSuccessResult(createUserResponse);
  }

  // 관리자 가입
  @Post('/sign-up/admin')
  async registerAdmin(@Body() createUserRequest: CreateUserRequest) {
    const createUserResponse = await this.usersService.registerAdmin(
      createUserRequest,
    );

    return ResultFactory.getSuccessResult(createUserResponse);
  }

  @Post('/login')
  async login(@Body() loginRequest: LoginRequest) {
    const loginResponse = await this.usersService.login(loginRequest);

    return ResultFactory.getSuccessResult(loginResponse);
  }
}
