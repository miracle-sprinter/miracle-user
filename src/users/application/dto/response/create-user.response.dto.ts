import { AddressInfo, Role, User } from '@prisma/client';

export class CreateUserResponse {
  id: string;
  email: string;
  nickname: string;
  contact: string;
  role: Role;
  address: AddressInfo;
  createdAt: Date;

  private constructor(
    id: string,
    email: string,
    nickname: string,
    contact: string,
    role: Role,
    address: AddressInfo,
    createdAt: Date,
  ) {
    this.id = id;
    this.email = email;
    this.nickname = nickname;
    this.contact = contact;
    this.role = role;
    this.address = address;
    this.createdAt = createdAt;
  }

  // entity로부터 response dto를 뽑아오는 메소드
  static fromEntity(user: User): CreateUserResponse {
    const { id, email, nickname, contact, role, addressInfo, createdAt } = user;
    return new CreateUserResponse(
      id,
      email,
      nickname,
      contact,
      role,
      addressInfo,
      createdAt,
    );
  }
}
