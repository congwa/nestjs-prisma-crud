import { IsNotEmpty, IsOptional, IsUrl, MaxLength } from 'class-validator';

export class UpdateProjectRequest {
  @IsNotEmpty()
  @MaxLength(20)
  name: string;

  @IsNotEmpty()
  description?: string;

  @IsOptional()
  @MaxLength(10)
  price?: number;

  @IsOptional()
  @IsUrl()
  image?: string;

  @IsNotEmpty()
  @MaxLength(10)
  menuId: number;
}
