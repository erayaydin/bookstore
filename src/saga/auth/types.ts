import { LoginRequest } from "../../models/login.request";
import { AuthResponse } from "../../models/auth.response";

export const LOGIN_REQUEST_SAGA = "LOGIN_REQUEST_SAGA";
export type LoginRequestSaga = {
  type: typeof LOGIN_REQUEST_SAGA,
  payload: { request: LoginRequest },
};

export const LOGIN_SUCCESS_SAGA = "LOGIN_SUCCESS_SAGA";
export type LoginSuccessSaga = {
  type: typeof LOGIN_SUCCESS_SAGA,
  payload: { response: AuthResponse },
};

export const LOGIN_FAIL_SAGA = "LOGIN_FAIL_SAGA";
export type LoginFailSaga = {
  type: typeof LOGIN_FAIL_SAGA,
  payload: { error?: any },
};
