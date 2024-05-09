import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Activate, User} from "../interfaces";
@Injectable({
  providedIn: 'root'
})
export class AuthService{
  constructor(private http: HttpClient) {
  }
  register(user: User) : Observable<User> {
    return this.http.post<User>('http://localhost:8088/api/auth/register', user)
  }

  confirm(token: { token: string }) {
    const params = new HttpParams().set('token', token.token);
    return this.http.get('http://localhost:8088/api/auth/activate-account', { params });
  }
  login(user: User): Observable<Activate> {
    return this.http.post<Activate>("http://localhost:8088/api/auth/login", user)
  }
}

