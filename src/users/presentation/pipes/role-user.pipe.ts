import { HttpException, Injectable, PipeTransform } from '@nestjs/common';
import { Role } from '@prisma/client';
import { ReadUserResponse } from '../../application/dto/response/read.user.response.dto';

@Injectable()
export class UserRoleExistsPipe implements PipeTransform {
  private readonly authorizedRoles: Role[] = [Role.ADMIN, Role.USER];
  transform(value: ReadUserResponse) {
    const authResult = this.authorizedRoles
      .map((role) => value.role === role)
      .includes(true);

    if (!authResult) {
      throw new HttpException('올바르지 않은 접근입니다.', 403);
    }

    return value;
  }
}
