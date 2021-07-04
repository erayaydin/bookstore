import { BookState } from "./book/types";
import { AuthState } from "./auth/types";

export type RootState = {
  book: BookState,
  auth: AuthState,
};
