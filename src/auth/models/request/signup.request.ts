import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

// https://docs.nestjs.com/openapi/cli-plugin#cli-plugin
export class SignupRequest {
  /**
   * A user email
   * @example 'rivers@gmail.com'
   */
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
   * A username
   * @example 'river'
   */
  @IsNotEmpty()
  // alphanumeric characters and - are valid
  // you can change this as you like
  @Matches(RegExp('^[a-zA-Z0-9\\-]+$'))
  @MaxLength(20)
  username: string;

  /**
   * A password
   * @example '88888888'
   */
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  /**
   * A first name
   * @example 'River'
   */
  @IsNotEmpty()
  @Matches(RegExp('^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ ]+$'))
  @MaxLength(20)
  firstName: string;

  /**
   * A last name
   * @example 'ray'
   */
  @IsNotEmpty()
  @Matches(RegExp('^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ ]+$'))
  @MaxLength(20)
  lastName: string;

  /**
   * A middle name
   * @example 'peter'
   */
  @IsOptional()
  @IsNotEmpty()
  @Matches(RegExp('^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ ]+$'))
  @MaxLength(20)
  middleName?: string;
}
