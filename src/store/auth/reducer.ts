import { AuthState } from "./types";
import { action, createReducer } from "deox";
import { authLoginAction, authLoginFailAction, authLoginSuccessAction, setAuthAction } from "./actions";
import { act } from "react-test-renderer";

const initialState: AuthState = {
  isLoggedIn: false,
  isLoggingIn: false,
  hasError: true
};


export const authReducer = createReducer(initialState, handle => [
  handle(authLoginAction, (state, action) => {
    return {
      ...state,
      isLoggingIn: true,
      hasError: false
    };
  }),
  handle(setAuthAction, (state, action) => {
    return {
      ...action.payload
    };
  }),
  handle(authLoginSuccessAction, (state, action) => {
    return {
      ...state,
      isLoggingIn: false,
      access_token: action.payload.response.access_token,
      user: action.payload.response.user,
      isLoggedIn: true,
      hasError: false
    };
  }),
  handle(authLoginFailAction, (state) => {
    return {
      ...state,
      isLoggedIn: false,
      isLoggingIn: false,
      hasError: true,
      user: undefined,
      access_token: undefined
    };
  })
]);
