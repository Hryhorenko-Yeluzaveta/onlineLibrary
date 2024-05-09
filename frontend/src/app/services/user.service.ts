import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {PageableBooks, User} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class UserService{
  constructor(private http: HttpClient) {
  }
  getUser(): Observable<User> {
    return this.http.get<User>('http://localhost:8088/api/user/currentUser')
  }
  getAllByBook(page: number, size: number): Observable<PageableBooks>{
    const params = new HttpParams().set('size', size);
    params.set('page', page);
    return this.http.get('http://localhost:8088/api/user/my-books', {params})
  }
}

