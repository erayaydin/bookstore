import { UserModel } from "./user.model";

export interface AuthResponse {
  access_token: string;
  user: UserModel;
}
