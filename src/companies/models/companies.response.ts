/**
 * 
 * 
 * model Company {
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

 */

export class CompaniesResponse {
  id: number;

  name: string | null;

  address: string | null;

  city: string | null;

  state: string | null;

  zip: string | null;

  phone: string | null;

  email: string | null;

  createdAt: Date | null;
}
