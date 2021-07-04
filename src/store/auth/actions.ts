import { createAction } from "deox";
import { LOGIN_FAIL_SAGA, LOGIN_REQUEST_SAGA, LOGIN_SUCCESS_SAGA } from "../../saga/auth/types";
import { LoginRequest } from "../../models/login.request";
import { AuthResponse } from "../../models/auth.response";
import { Dispatch } from "redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthState } from "./types";

export const authLoginAction = createAction(
  LOGIN_REQUEST_SAGA,
  resolve => (payload: { request: LoginRequest }) => resolve(payload)
);

export const authLoginSuccessAction = createAction(
  LOGIN_SUCCESS_SAGA,
  resolve => (payload: { response: AuthResponse }) => resolve(payload)
);

export const authLoginFailAction = createAction(
  LOGIN_FAIL_SAGA,
  resolve => (payload: { error?: any }) => resolve(payload)
);

export const setAuthAction = createAction(
  "SET_AUTH_ACTION",
  resolve => (payload: AuthState) => resolve(payload)
);

export const asyncInitializeLoginAction = () => async (dispatch: Dispatch) => {
  const defaultStore: AuthState = {
    isLoggedIn: false,
    hasError: false,
    isLoggingIn: false
  };
  const storeStr = (await AsyncStorage.getItem("@auth")) || JSON.stringify(defaultStore);
  const store: AuthState = JSON.parse(storeStr);
  await dispatch(setAuthAction(store));

  return store.isLoggedIn;
};

export const asyncLogoutAction = () => async (dispatch: Dispatch) => {
  const defaultStore: AuthState = {
    isLoggingIn: false,
    isLoggedIn: false,
    hasError: false
  };
  await AsyncStorage.setItem("@auth", JSON.stringify(defaultStore));
  await dispatch(setAuthAction(defaultStore));

  return true;
};
