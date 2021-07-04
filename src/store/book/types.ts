import { BookModel, UserBookModel } from "../../models/book.model";
import { MetaModel } from "../../models/meta.model";

export type BookState = {
  bookList: BookModel[];
  bookListMeta?: MetaModel;
  currentBook?: UserBookModel;
  isLoading: boolean;
};
