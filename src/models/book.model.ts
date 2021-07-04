import { PublisherModel } from "./publisher.model";
import { AuthorModel } from "./author.model";
import { SectionModel } from "./section.model";

export interface BookModel {
  uuid: string;
  name: string;
  isbn: string;
  total_pages: number;
  published_at?: string;
  price: number;
  publisher: PublisherModel;
  authors: AuthorModel[];
  sections: SectionModel[];
  pdf: string;
  image?: string;
}

export interface UserBookModel extends BookModel {
  currentPage: number;
}
