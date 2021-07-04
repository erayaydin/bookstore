import { ResponseModel } from "../models/response.model";
import { URI } from "../config";
import { LoginRequest } from "../models/login.request";
import { AuthResponse } from "../models/auth.response";
import {RegisterRequest} from "../models/register.request";

export const loginApi = (request: LoginRequest) => {
  return new Promise<AuthResponse>((resolve, reject) => {
    const url = new URL(`${URI}/auth/token`);

    fetch(url.toString(), {
      method: "POST",
      headers: {
        Host: "bookstore.localhost",
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(request)
    }).then(res => res.json()).then(data => resolve(data)).catch(e => reject(e));
  });
};

export const registerApi = (request: RegisterRequest) => {
  return new Promise<number>((resolve, reject) => {
    const url = new URL(`${URI}/auth/register`);

    fetch(url.toString(), {
      method: "POST",
      headers: {
        Host: "bookstore.localhost",
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(request)
    }).then(res => resolve(res.status)).catch(e => reject(e));
  });
};
