import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgIf} from "@angular/common";
import {RatingComponent} from "../rating/rating.component";
import {Router, RouterLink} from "@angular/router";
import {UserService} from "../../../../services/user.service";
import {Book} from "../../../../interfaces";
import {BookService} from "../../../../services/book.service";

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [
    NgIf,
    RatingComponent,
    RouterLink
  ],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css'
})
export class BookCardComponent implements OnInit
{
  constructor(private userService: UserService, private bookService: BookService, private router: Router) {
  }
  private _book: Book = {};
  private _bookImage: string | undefined;
  public _admin = false;
  public message: string = "";
  public isLiked: boolean | undefined = false;
  public page = 0;
  public size = 5;
  public errorMessage: string = "";
  get book(): Book {
    return this._book;
  }
  @Input()
  set book(value: Book) {
    this._book = value;
  }

  isAdmin() {
    this.userService.getUser().subscribe({
      next: user => {
        if(user.role == "ADMIN") {
          this._admin = true;
        }
        else {
          this._admin = false
        }
      }
    });
  }

  get bookImage(): string | undefined {
    if(this._book.image) {
      return 'data:image/jpg;base64, ' + this._book.image;
    } else
    return 'http://source.unsplash.com/user/c_v_r/1900x800';
  }

  ngOnInit(): void {
    this.userService.getAllByBook(this.page, this.size).subscribe({
      next: (books) => {
        this.isLiked = books.content?.some((book) => book.id === this.book.id);
      }
    })
    this.isAdmin();
  }
  toLike(book: Book) {
    this.message = '';
    this.bookService.addWantedBook({
      'bookId': book.id as number
    }).subscribe({
      next: () => {
        this.message = 'Книжку було збережено в обране';
        this.isLiked = true;
      }, error: (err) => {
        console.log(err)
        this.errorMessage = "Сталася помилка. Зв'яжіться з адміністратором.";
      }
    })
  }
  toDislike(book: Book) {
    this.message = '';

    this.bookService.deleteWantedBook({
      'bookId': book.id as number
    }).subscribe({
      next: () => {
        this.message = 'Книжку було вилучено з обраного';
        this.isLiked = false;
      },
      error: (err) => {
        console.log(err)
        this.errorMessage = "Сталася помилка. Зв'яжіться з адміністратором.";
      }
    })
  }

  onDelete(bookId: number | undefined) {
    this.bookService.deleteBook(bookId).subscribe({
      next: value => {
        window.location.reload()
      }
    })
  }

  onEdit(bookId: number | undefined) {
    this.router.navigate(['/books/edit/' + bookId])
  }
}
