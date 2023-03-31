# Prisma schema装饰器

Prisma schema是一种通过GraphQL API管理数据库的方式，支持使用装饰器来配置数据模型和数据源。以下是Prisma schema中常见的装饰器及其使用方法：

## 数据模型

### @id

用法：@id

说明：声明该字段是模型的主键。

示例：

```prisma
model User {
  id    Int    @id @default(autoincrement())
  name  String
  email String @unique
}
```

### @unique

用法：@unique

说明：指定该字段必须是唯一的。

示例：

```prisma
model User {
  id    Int    @id @default(autoincrement())
  name  String
  email String @unique
}
```

### @updatedAt

用法：@updatedAt

说明：指定在模型实例更新时自动设置该字段。

示例：

```prisma
model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String
  published Boolean @default(false)
  author    User    @relation(fields: [authorId], references: [id])
  authorId  Int
  updatedAt DateTime @updatedAt
}
```

### @relation

用法：@relation(fields: [外键字段], references: [引用字段])

说明：定义数据模型之间的关系。

示例：

```prisma
model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String
  published Boolean @default(false)
  author    User    @relation(fields: [authorId], references: [id])
  authorId  Int
}
```

### @default

用法：@default(默认值)

说明：指定该字段的默认值。

示例：

```prisma
model User {
  id    Int    @id @default(autoincrement())
  name  String
  email String @unique
  status String @default("active")
}
```

### @map

用法：@map(name: "自定义名称")

说明：为数据库表或字段指定自定义名称。

示例：

```prisma
model User {
  id   Int     @id @map(name: "user_id") @default(autoincrement())
  name String  @map(name: "full_name")
}
```

## 数据源

### datasource

用法：

```prisma
datasource db {
  provider = "mysql"
  url      = "mysql://user:password@localhost:3306/mydatabase"
}
```

说明：配置一个数据源。

## 枚举

### enum

用法：

```prisma
enum Role {
  USER
  ADMIN
  EDITOR
}
```

说明：声明一个枚举类型。

## 其他装饰器

### @ignore

用法：@ignore

说明：忽略此字段。

示例：

```prisma
model User {
  id     Int    @id @default(autoincrement())
  name   String
  status String @ignore
}
```

### @transform

用法：@transform(field: "字段名称", to: "类型")

说明：将字段的值进行类型转换。

示例：

```prisma
model User {
  id       Int    @id @default(autoincrement())
  name     String @transform(field: "name", to: "lowercase")
  password String
}
```

### @computed

用法：@computed(fieldName: "计算字段名称", expression: "计算表达式")

说明：计算字段，根据指定的计算表达式得到一个返回值。

示例：

```prisma
model User {
  id        Int    @id @default(autoincrement())
  firstName String
  lastName  String

  fullName  String? @computed(fieldName: "fullName", expression: "$firstName + ' ' + $lastName")
}
```

以上是Prisma schema中常见的装饰器及其使用方法。