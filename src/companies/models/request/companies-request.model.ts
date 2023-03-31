import { IsNotEmpty, IsOptional, MaxLength, IsEmail } from 'class-validator';

export class UpdateCompaniesRequest {
  @MaxLength(20)
  name: string;

  @IsOptional()
  @MaxLength(50)
  address?: string;

  @IsOptional()
  @MaxLength(50)
  city?: string;

  @IsOptional()
  state?: string;

  @IsNotEmpty()
  zip?: string;

  @IsNotEmpty()
  @MaxLength(11)
  phone?: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(20)
  email?: string;
}
