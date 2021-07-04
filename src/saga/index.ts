import  { all } from "redux-saga/effects";
import { bookSaga } from "./book/actions";
import { authSaga } from "./auth/actions";

export function* saga() {
  yield all([
    bookSaga(),
    authSaga()
  ]);
}
