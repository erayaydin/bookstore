import { RequestModel } from "../models/request.model";
import { URI } from "../config";
import { ResponseModel } from "../models/response.model";
import { BookModel } from "../models/book.model";

export const fetchBookApi = (request: RequestModel) => {
  return new Promise<ResponseModel<BookModel[]>>((resolve, reject) => {
    const url = new URL(`${URI}/book`);

    fetch(`${url.toString()}?page=${(request.page ?? 1).toString()}`, {
      method: "GET",
      headers: {
        Host: "bookstore.localhost",
        Accept: "application/json",
        Authorization: `Bearer ${request.access_token}`
      }
    }).then(res => res.json()).then(data => resolve(data)).catch(e => reject(e));
  });
};
