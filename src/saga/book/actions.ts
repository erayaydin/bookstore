import { put, takeLatest } from "redux-saga/effects";
import {
  BOOK_LIST_FETCH_ERROR,
  FETCH_BOOK_LIST_SAGA,
  FetchBookList
} from "./types";
import { BookModel } from "../../models/book.model";
import { fetchBookApi } from "../../api/book.api";
import { ResponseModel } from "../../models/response.model";
import { fetchBooksFailedAction, updateBookList } from "../../store/book/actions";

function* fetchBook(action: FetchBookList) {
  let response;
  try {
    const bookList: ResponseModel<BookModel[]> = yield fetchBookApi(action.payload.request);
    response = updateBookList({ list: bookList.data, meta: bookList.meta });
  } catch (e) {
    response = fetchBooksFailedAction({ error: e });
  }
  yield put(response);
}

export function* bookSaga() {
  yield takeLatest(FETCH_BOOK_LIST_SAGA, fetchBook);
}
