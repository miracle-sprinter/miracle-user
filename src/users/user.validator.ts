import { UserRepository } from './user.repository';
import { Injectable } from '@nestjs/common';
import { CreateUserRequest } from './dto/request/user.create.request.dto';
import { ValidationResult } from 'src/common/results/validate.result';

@Injectable()
export class UserValidator {
  constructor(private readonly userRepository: UserRepository) {}

  // 해당 생성 요청이 가능한지 여부를 검증하는 메소드
  async isCreatable(
    createUserRequest: CreateUserRequest,
  ): Promise<ValidationResult> {
    const { email, nickname } = createUserRequest;

    // 1. email이 중복인가?
    const userByEmail = await this.userRepository.findByEmail(email);

    if (userByEmail) {
      return new ValidationResult(false, '중복된 이메일이 존재합니다');
    }

    // 2. nickname이 중복인가?
    const userByNickname = await this.userRepository.findByNickname(nickname);

    if (userByNickname) {
      return new ValidationResult(false, '중복된 닉네임이 존재합니다');
    }

    return new ValidationResult(true);
  }
}
