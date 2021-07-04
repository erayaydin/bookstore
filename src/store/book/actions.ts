import { createAction } from "deox";
import { BookModel } from "../../models/book.model";
import { MetaModel } from "../../models/meta.model";
import { RequestModel } from "../../models/request.model";
import { BOOK_LIST_FETCH_ERROR, BOOK_LIST_FETCHED, FETCH_BOOK_LIST_SAGA } from "../../saga/book/types";

export const updateBookList = createAction(
  BOOK_LIST_FETCHED,
  resolve => (payload: { list: BookModel[], meta?: MetaModel }) => resolve(payload)
);

export const setCurrentBook = createAction(
  "SET_CURRENT_BOOK",
  resolve => (payload: { book: BookModel, currentPage?: number }) => resolve(payload)
);

export const setCurrentPage = createAction(
  "SET_CURRENT_BOOK_PAGE",
  resolve => (payload: { page: number }) => resolve(payload)
);

export const fetchBooksAction = createAction(
  FETCH_BOOK_LIST_SAGA,
  resolve => (payload: { request: RequestModel }) => resolve(payload)
);

export const fetchBooksFailedAction = createAction(
  BOOK_LIST_FETCH_ERROR,
  resolve => (payload: { error?: any }) => resolve(payload)
);


export const setBooksLoadingAction = createAction(
  FETCH_BOOK_LIST_SAGA,
  resolve => () => resolve()
);
