import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Book, BookFile, PageableBooks} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private http: HttpClient) {
  }

  addWantedBook(param: { bookId: number }) {
    return this.http.get(`http://localhost:8088/api/user/book/wantedBook/${param.bookId}`);
  }
  deleteWantedBook(param: { bookId: number }) {
    return this.http.get(`http://localhost:8088/api/user/book/deleteWantedBook/${param.bookId}`);
  }

  getAll(param: { size: number; page: number }) {
    const params = new HttpParams().set('size', param.size);
    params.set('page', param.page)
    return this.http.get('http://localhost:8088/api/user/book/all', { params });
  }

  getAllByCategory(param: { size: number; page: number}, categoryId: number) {
    const params = new HttpParams().set('size', param.size);
    params.set('page', param.page)
    return this.http.get(`http://localhost:8088/api/user/book/allByCategory/${categoryId}`, { params });
  }

  saveBook(formData: FormData, categoryId: number) {
    return this.http.post(`http://localhost:8088/api/admin/book/create/${categoryId}`, formData)
  }

  getBookById(bookId: number): Observable<Book> {
    return this.http.get<Book>(`http://localhost:8088/api/user/book/getById/${bookId}`)
  }

  downloadBook(fileId: number | undefined) {
    if (fileId) {
      this.http.get(`http://localhost:8088/api/file/download/${fileId}`, { responseType: 'blob' }).subscribe((blob: Blob) => {
        const downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(blob);
        downloadLink.setAttribute('download', `book_${fileId}.pdf`);
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      });
    }
  }

  findByBookId(bookId: number | undefined) {
    return this.http.get<BookFile>(`http://localhost:8088/api/file/getByBookId/${bookId}`);
  }

  deleteBook(id: number | undefined) {
    return this.http.delete(`http://localhost:8088/api/admin/book/delete/${id}`)
  }
  updateBook(id: number | undefined, formData: FormData) : Observable<Book> {
    return this.http.patch<Book>(`http://localhost:8088/api/admin/book/update/${id}`, formData)
  }

  getByAuthor(authorName: string): Observable<PageableBooks> {
    return this.http.get<PageableBooks>(`http://localhost:8088/api/user/book/allByAuthor/${authorName}`)
  }

  getAllWithoutPag(): Observable<Book[]> {
    return this.http.get<Book[]>('http://localhost:8088/api/user/book/allNoPag')
  }

  getByName(bookName: string): Observable<Book> {
    return this.http.get<Book>(`http://localhost:8088/api/user/book/findByName/${bookName}`)
  }
}
