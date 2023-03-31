

model Banner {
  id        Int     @id @default(autoincrement())
  title     String
  imageUrl  String
  linkUrl   String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("banner")
}
model Menu {
  id        Int      @id @default(autoincrement())
  name      String
  url       String?
  parentId Int?

  @@map("menu")
}
model Company {
  id        Int      @id @default(autoincrement())
  name      String?
  address   String?
  city      String?
  state     String?
  zip       String?
  phone     String?
  email     String?
  createdAt DateTime @default(now())

  @@map("company")
}

model Product {
  id          Int      @id @default(autoincrement())
  name        String
  description String?
  price       Float?
  image       String?
  menuId      Int

  @@map("product")
}

model News {
  id          Int      @id @default(autoincrement())
  title       String
  content     String?
  authorId   Int?
  createAt DateTime @default(now())
  updateAt DateTime? @updatedAt
  menuId     Int

  @@map("news")
}
基于以上model生成mock数据，图片地址填https://p.ipic.vip/3jlm43.png，生成一组 ALTER TABLE语句

-- 在 company 表中插入一些数据
INSERT INTO "company" ("name", "address", "city", "state", "zip", "phone", "email", "createdAt") VALUES ('ABC 公司', '某街道 123 号', '北京市', '北京市', '100000', '12345678901', 'abc@example.com', '2023-03-24 16:45:55');

-- 在 product 表中插入一些数据
INSERT INTO "product" ("name", "description", "price", "image", "menuId") VALUES ('商品1', '描述1', 10.99, 'https://p.ipic.vip/3jlm43.png', 1), ('商品2', '描述2', 19.99, 'https://p.ipic.vip/3jlm43.png', 2);

-- 在 news 表中插入一些数据
INSERT INTO "news" ("title", "content", "authorId", "createdAt", "menuId") VALUES ('新闻标题1', '详细内容1', 1, '2023-03-24 16:45:55', 1), ('新闻标题2', '详细内容2', 2, '2023-03-24 16:45:55', 2);

INSERT INTO "banner" ("title", "imageUrl", "linkUrl", "createdAt", "updatedAt") VALUES ('title1', 'https://p.ipic.vip/3jlm43.png', 'https://www.example.com/1', '2023-03-25 10:00:00', '2023-03-25 10:00:00');
INSERT INTO "banner" ("title", "imageUrl", "linkUrl", "createdAt", "updatedAt") VALUES ('title2', 'https://p.ipic.vip/3jlm43.png', 'https://www.example.com/2', '2023-03-25 11:00:00', '2023-03-25 11:00:00');
INSERT INTO "banner" ("title", "imageUrl", "linkUrl", "createdAt", "updatedAt") VALUES ('title3', 'https://p.ipic.vip/3jlm43.png', 'https://www.example.com/3', '2023-03-25 12:00:00', '2023-03-25 12:00:00');
INSERT INTO "banner" ("title", "imageUrl", "linkUrl", "createdAt", "updatedAt") VALUES ('title4', 'https://p.ipic.vip/3jlm43.png', 'https://www.example.com/4', '2023-03-25 13:00:00', '2023-03-25 13:00:00');
INSERT INTO "banner" ("title", "imageUrl", "linkUrl", "createdAt", "updatedAt") VALUES ('title5', 'https://p.ipic.vip/3jlm43.png', 'https://www.example.com/5', '2023-03-25 14:00:00', '2023-03-25 14:00:00');


-- 插入5个父目录
INSERT INTO "menu" ("name", "url", "parentId") VALUES ('父目录1', null, null);
INSERT INTO "menu" ("name", "url", "parentId") VALUES ('父目录2', null, null);
INSERT INTO "menu" ("name", "url", "parentId") VALUES ('父目录3', null, null);
INSERT INTO "menu" ("name", "url", "parentId") VALUES ('父目录4', null, null);
INSERT INTO "menu" ("name", "url", "parentId") VALUES ('父目录5', null, null);

-- 插入50个子目录
INSERT INTO "menu" ("name", "url", "parentId") VALUES ('子目录1', 'https://www.example.com/sub1', 1);
INSERT INTO "menu" ("name", "url", "parentId") VALUES ('子目录2', 'https://www.example.com/sub2', 1);
INSERT INTO "menu" ("name", "url", "parentId") VALUES ('子目录3', 'https://www.example.com/sub3', 1);
INSERT INTO "menu" ("name", "url", "parentId") VALUES ('子目录4', 'https://www.example.com/sub4', 1);
INSERT INTO "menu" ("name", "url", "parentId") VALUES ('子目录5', 'https://www.example.com/sub5', 1);
-- 同样的方式插入45个子目录

-- 随机将每个子目录插入到5个父目录中
UPDATE "menu" SET "parentId" = CASE floor(random() * 5) + 1
  WHEN 1 THEN 1
  WHEN 2 THEN 2
  WHEN 3 THEN 3
  WHEN 4 THEN 4
  WHEN 5 THEN 5
  ELSE NULL END
WHERE "parentId" IS NOT NULL;



INSERT INTO "news" ("title", "content", "authorId", "createdAt", "updatedAt", "menuId")
SELECT '标题' || n, '内容' || n, floor(random() * 1000) + 1, '2023-03-25 10:00:00'::timestamp + (n || ' second')::interval, NULL, floor(random() * 5) + 6
FROM generate_series(1, 200) AS s(n);

