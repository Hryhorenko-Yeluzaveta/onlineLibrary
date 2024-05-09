import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class CategoryService{
  constructor(private http: HttpClient) {
  }
  fetch() : Observable<Category[]> {
    return this.http.get<Category[]>('http://localhost:8088/api/user/category/all')
  }

  saveCategory(category: Category): Observable<Category> {
    return this.http.post<Category>('http://localhost:8088/api/admin/category/create', category)
  }
}

