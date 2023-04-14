import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { ReadUserResponse } from '../dto/response/read.user.response.dto';

export const ReadUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return request.user as ReadUserResponse;
  },
);
