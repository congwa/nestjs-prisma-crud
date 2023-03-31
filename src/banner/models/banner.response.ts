// import type { Banner } from '@prisma/client';

/**
 * 
 * /**
 * model Banner {
  id        Int     @id @default(autoincrement())
  title     String
  imageUrl  String
  linkUrl   String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("banner")
}
 */

export class BannerResponse {
  id: number;

  title: string;

  imageUrl: string;

  linkUrl: string | null;

  createdAt: Date | null;

  updatedAt: Date | null; // ISO Date

  // static fromUserEntity(entity: Banner): BannerResponse {
  //   const response = new BannerResponse();
  //   response.id = entity.id;
  //   response.title = entity.title;
  //   response.imageUrl = entity.imageUrl;
  //   response.linkUrl = entity.linkUrl;
  //   response.createdAt = entity.createdAt;
  //   response.updatedAt = entity.updatedAt;
  //   return response;
  // }
}
