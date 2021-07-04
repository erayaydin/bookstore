import { BookModel } from "./book.model";

export interface AuthorModel {
  uuid: string;
  name: string;
  books?: BookModel[];
  created_at?: string;
  updated_at?: string;
}
