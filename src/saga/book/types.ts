import { RequestModel } from "../../models/request.model";
import { BookModel } from "../../models/book.model";
import { MetaModel } from "../../models/meta.model";

export const FETCH_BOOK_LIST_SAGA = "FETCH_BOOK_LIST_SAGA";
export type FetchBookList = {
  type: typeof FETCH_BOOK_LIST_SAGA,
  payload: { request: RequestModel },
}

export const BOOK_LIST_FETCHED = "BOOK_LIST_FETCHED";
export type BookListFetched = {
  type: typeof BOOK_LIST_FETCHED,
  payload: { bookList: BookModel[], meta?: MetaModel }
};

export const BOOK_LIST_FETCH_ERROR = "BOOK_LIST_FETCH_ERROR";
export type BookListFetchError = {
  type: typeof BOOK_LIST_FETCH_ERROR,
  payload: { error?: any; }
}
