import { put, takeEvery } from "redux-saga/effects";
import {
  LOGIN_FAIL_SAGA,
  LOGIN_REQUEST_SAGA,
  LOGIN_SUCCESS_SAGA,
  LoginFailSaga,
  LoginRequestSaga,
  LoginSuccessSaga
} from "./types";
import { AuthResponse } from "../../models/auth.response";
import { loginApi } from "../../api/auth.api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthState } from "../../store/auth/types";

function* loginRequest(action: LoginRequestSaga) {
  let response: LoginSuccessSaga | LoginFailSaga;
  try {
    const authResponse: AuthResponse = yield loginApi(action.payload.request);
    if (!authResponse.access_token) {
      throw { error: "invalid username or password" };
    }
    response = { type: LOGIN_SUCCESS_SAGA, payload: { response: authResponse } };

    const authState: AuthState = {
      isLoggedIn: true,
      isLoggingIn: false,
      hasError: false,
      access_token: authResponse.access_token,
      user: authResponse.user
    };

    yield AsyncStorage.setItem("@auth", JSON.stringify(authState));
  } catch (e) {
    response = { type: LOGIN_FAIL_SAGA, payload: { error: e } };
  }

  yield put(response);
}

export function* authSaga() {
  yield takeEvery(LOGIN_REQUEST_SAGA, loginRequest);
}
