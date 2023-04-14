export class LoginResponse {
  jwtToken: string;

  constructor(jwtToken: string) {
    this.jwtToken = jwtToken;
  }
}
