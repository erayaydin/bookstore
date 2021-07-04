import { UserModel } from "../../models/user.model";

export type AuthState = {
  isLoggedIn: boolean;
  isLoggingIn: boolean;
  hasError: boolean;
  user?: UserModel;
  access_token?: string;
}
