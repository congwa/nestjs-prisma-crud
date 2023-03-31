export class LoginResponse {
  /**
   * jwt token
   * @example ['xxxxxx']
   */
  token: string;

  constructor(token: string) {
    this.token = token;
  }
}
