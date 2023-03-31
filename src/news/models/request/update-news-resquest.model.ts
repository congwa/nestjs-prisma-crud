import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class UpdateNewsRequest {
  @IsNotEmpty()
  @MaxLength(20)
  title: string;

  @IsNotEmpty()
  content?: string;

  @IsOptional()
  @MaxLength(10)
  authorId?: number;

  @IsNotEmpty()
  @MaxLength(10)
  menuId: number;
}
