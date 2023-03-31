export class NewsResponse {
  id: number;

  title: string;

  content: string | null;

  authorId: number | null;

  menuId: number;

  createdAt: Date | null;

  updatedAt: Date | null;
}
