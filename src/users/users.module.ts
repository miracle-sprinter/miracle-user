import { Module } from '@nestjs/common';
import { UsersService } from './application/service/users.service';
import { UsersController } from './presentation/controller/users.controller';
import { UserRepository } from './domain/user.repository';
import { UserValidator } from './application/validator/user.validator';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './presentation/jwt/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '2h' },
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
      session: false,
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserRepository, UserValidator, JwtStrategy],
})
export class UsersModule {}
