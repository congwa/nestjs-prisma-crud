import { IsNotEmpty, IsOptional, IsUrl, MaxLength } from 'class-validator';

export class UpdateMenuRequest {
  @IsNotEmpty()
  @MaxLength(20)
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsUrl()
  url?: string;

  @IsOptional()
  @IsNotEmpty()
  @MaxLength(10)
  parentId?: number;
}
