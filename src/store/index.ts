import { applyMiddleware, combineReducers, createStore } from "redux";
import { bookReducer } from "./book/reducer";
import { RootState } from "./types";
import createSagaMiddleware from "redux-saga";
import { saga } from "../saga";
import { authReducer } from "./auth/reducer";

const reducers = combineReducers<RootState>({
  book: bookReducer,
  auth: authReducer
});

const middleware = createSagaMiddleware();

export const store = createStore(reducers, applyMiddleware(middleware));
middleware.run(saga);
