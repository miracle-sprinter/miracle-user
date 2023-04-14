import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';
import * as bcrypt from 'bcrypt';
import { Role, User } from '@prisma/client';

export class CreateUserRequest {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 20)
  password: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 30)
  nickname: string;

  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber('KR')
  contact: string;

  @IsNotEmpty()
  @IsString()
  addressNickname: string;

  @IsNumber()
  zipCode: number;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  detailAddress: string;

  toEntity(role: Role): User {
    const now = new Date();

    return {
      id: undefined,
      email: this.email,
      password: this.password,
      nickname: this.nickname,
      contact: this.contact,
      role: role,
      addressInfo: {
        addressNickname: this.addressNickname,
        zipCode: this.zipCode,
        address: this.address,
        detailAddress: this.detailAddress,
      },
      createdAt: now,
      updatedAt: null,
      deletedAt: null,
      isDeleted: false,
    };
  }

  async getHashedRequest(): Promise<CreateUserRequest> {
    const { password } = this;
    const hashedPassword = await bcrypt.hash(password, 10);
    this.password = hashedPassword;

    return this;
  }
}
