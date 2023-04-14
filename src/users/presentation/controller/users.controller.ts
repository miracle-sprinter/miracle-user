import { CreateUserRequest } from '../../application/dto/request/user.create.request.dto';
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { UsersService } from '../../application/service/users.service';
import { ResultFactory } from 'src/common/results/results.factory';
import { LoginRequest } from '../../application/dto/request/user.login.request.dto';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { ReadUser } from '../decorators/user.read.decorator';
import { UserRoleExistsPipe } from '../pipes/role-user.pipe';
import { ReadUserResponse } from '../../application/dto/response/read.user.response.dto';

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

  // 로그인
  @Post('/login')
  async login(@Body() loginRequest: LoginRequest) {
    const loginResponse = await this.usersService.login(loginRequest);

    return ResultFactory.getSuccessResult(loginResponse);
  }

  // 사용자 프로파일 조회
  @UseGuards(JwtAuthGuard)
  @Post('/profile')
  async readprofile(
    @ReadUser(UserRoleExistsPipe) authResult: ReadUserResponse,
  ) {
    return ResultFactory.getSuccessResult(authResult);
  }
}
