import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './user.repository';
import { UserValidator } from './user.validator';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, UserRepository, UserValidator],
})
export class UsersModule {}
