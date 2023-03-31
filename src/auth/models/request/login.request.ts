import { IsNotEmpty, MinLength } from 'class-validator';

export class LoginRequest {
  /**
   * user email or username
   * @example 'river'
   */
  @IsNotEmpty()
  identifier: string;

  /**
   * user password
   * @example '88888888'
   */
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
