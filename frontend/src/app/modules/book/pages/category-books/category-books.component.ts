import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {BookCardComponent} from "../../components/book-card/book-card.component";
import {ActivatedRoute, Params, Router, RouterLink} from "@angular/router";
import {PageableBooks} from "../../../../interfaces";
import {BookService} from "../../../../services/book.service";
import {UserService} from "../../../../services/user.service";

@Component({
  selector: 'app-category-books',
  standalone: true,
  imports: [
    NgForOf,
    BookCardComponent,
    NgIf,
    RouterLink
  ],
  templateUrl: './category-books.component.html',
  styleUrl: './category-books.component.css'
})
export class CategoryBooksComponent implements OnInit{
  page: number = 0;
  size: number = 8;
  books: PageableBooks = {};
  categoryId: number = 0;
  _admin: boolean = false;
  haveElements: undefined | boolean = false;
  constructor(private userService: UserService, private bookService: BookService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.findAllBooksByCategory();
    this.isAdmin();
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
  private findAllBooksByCategory() {
    this.route.params.subscribe((params: Params) => {
      const id = +params['categoryId'];
      if (!isNaN(id)) {
        this.categoryId = id;
        this.bookService.getAllByCategory({
          page: this.page,
          size: this.size
        }, this.categoryId).subscribe({
          next: books => {
            this.books = books;
            this.haveElements = (this.books.content && this.books.content.length > 0);
          }
        });
      }
    })
  }
  goToPreviousPage() {
    this.page--;
    this.findAllBooksByCategory();
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllBooksByCategory();
  }

  goToPage(pageIndex: number) {
    this.page = pageIndex;
    this.findAllBooksByCategory();
  }

  goToNextPage() {
    this.page++;
    this.findAllBooksByCategory();
  }

  goToLastPage() {
    this.page = this.books.totalPages as number - 1;
    this.findAllBooksByCategory();
  }

  get isLastPage():boolean {
    return this.page == this.books.totalPages as number -1;
  }
}
