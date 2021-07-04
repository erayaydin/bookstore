import { BookState } from "./types";
import { createReducer } from "deox";
import {
  fetchBooksFailedAction,
  setBooksLoadingAction,
  setCurrentBook,
  setCurrentPage,
  updateBookList
} from "./actions";
import { UserBookModel } from "../../models/book.model";

const initialState: BookState = {
  bookList: [],
  isLoading: false
};

export const bookReducer = createReducer(initialState, handle => [
  handle(updateBookList, (state, action) => {
    return {
      ...state,
      bookList: action.payload.list,
      bookListMeta: action.payload.meta,
      isLoading: false
    };
  }),
  handle(setBooksLoadingAction, (state) => {
    return {
      ...state,
      isLoading: true
    };
  }),
  handle(fetchBooksFailedAction, (state) => {
    return {
      ...state,
      bookList: [],
      bookListMeta: undefined,
      isLoading: false
    };
  }),
  handle(setCurrentBook, (state, action) => {
    return {
      ...state,
      currentBook: { ...action.payload.book, currentPage: action.payload.currentPage ?? 0 }
    };
  }),
  handle(setCurrentPage, (state, action) => {
    let currentBook: UserBookModel | undefined = undefined;
    if (state.currentBook) {
      currentBook = { ...state.currentBook, currentPage: action.payload.page };
    }

    return {
      ...state,
      currentBook
    };
  })
]);
