import { AddressInfo, Role, User } from '@prisma/client';

export class ReadUserResponse {
  id: string;
  email: string;
  nickname: string;
  contact: string;
  role: Role;
  addressInfo: AddressInfo;

  constructor(
    id: string,
    email: string,
    nickname: string,
    contact: string,
    role: Role,
    addressInfo: AddressInfo,
  ) {
    this.id = id;
    this.email = email;
    this.nickname = nickname;
    this.contact = contact;
    this.role = role;
    this.addressInfo = addressInfo;
  }

  static fromEntity(user: User): ReadUserResponse {
    const { id, email, nickname, contact, role, addressInfo } = user;

    return new ReadUserResponse(
      id,
      email,
      nickname,
      contact,
      role,
      addressInfo,
    );
  }
}
