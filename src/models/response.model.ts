import { MetaModel } from "./meta.model";

export interface ResponseModel<T> {
  data: T;
  meta?: MetaModel;
}
