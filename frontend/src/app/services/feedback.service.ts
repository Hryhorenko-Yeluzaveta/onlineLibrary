import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category, Feedback} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class FeedbackService{
  constructor(private http: HttpClient) {
  }

  addFeedback(feedBack: Feedback, bookId: number | undefined): Observable<Feedback> {
    return this.http.post<Feedback>(`http://localhost:8088/api/user/feedback/create/${bookId}`, feedBack)
  }

  getAll(bookId: number | undefined, param: { size: number; page: number }) {
    const params = new HttpParams().set('size', param.size);
    params.set('page', param.page)
    return this.http.get(`http://localhost:8088/api/user/feedback/all/${bookId}`, { params });
  }
}
