import { IsNotEmpty, IsOptional, IsUrl, MaxLength } from 'class-validator';

/**
 * model Banner {
  id        Int     @id @default(autoincrement())
  title     String
  imageUrl  String
  linkUrl   String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("banner")
}
 * 
 * 
 */

export class UpdateBannerRequest {
  @IsNotEmpty()
  @MaxLength(20)
  title: string;

  @IsNotEmpty()
  @IsUrl()
  imageUrl: string;

  @IsOptional()
  @IsUrl()
  linkUrl?: string;
}
