import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UsersService } from '../../application/service/users.service';
import { JwtPayload } from '../../application/dto/request/jwt.payload.dto';
import { ReadUserResponse } from '../../application/dto/response/read.user.response.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtPayload): Promise<ReadUserResponse> {
    return this.usersService.getProfileFromJwtPayload(payload);
  }
}
