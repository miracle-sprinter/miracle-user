import { CreateUserRequest } from './dto/request/user.create.request.dto';
import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { ResultFactory } from 'src/common/results/results.factory';

@Controller('/api/auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // 일반 유저 가입
  @Post('/register')
  async registerUser(@Body() createUserRequest: CreateUserRequest) {
    console.log(createUserRequest instanceof CreateUserRequest);
    console.log(createUserRequest);
    const createUserResponse = await this.usersService.registerUser(
      createUserRequest,
    );

    return ResultFactory.getSuccessResult(createUserResponse);
  }
}
