import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {BookCardComponent} from "../../components/book-card/book-card.component";
import {PageableBooks} from "../../../../interfaces";
import {BookService} from "../../../../services/book.service";

@Component({
  selector: 'app-all-books',
  standalone: true,
  imports: [
    NgForOf,
    BookCardComponent,
    NgIf
  ],
  templateUrl: './all-books.component.html',
  styleUrl: './all-books.component.css'
})
export class AllBooksComponent implements OnInit{
  books: PageableBooks = {};
  public page = 0;
  public size = 5;
  public message: string = "";
    constructor(private bookService: BookService, private router: Router) {
    }
  haveElements: undefined | boolean = false;
    ngOnInit() {
      this.findAllBooks();
    }

  private findAllBooks() {
    this.bookService.getAll({
      page: this.page,
      size: this.size
    }).subscribe({
      next: books => {
        this.books = books;
        this.haveElements = (this.books.content && this.books.content.length > 0);
      }
    })
  }

  goToPreviousPage() {
    this.page--;
    this.findAllBooks();
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllBooks();
  }

  goToPage(pageIndex: number) {
    this.page = pageIndex;
    this.findAllBooks();
  }

  goToNextPage() {
    this.page++;
    this.findAllBooks();
  }

  goToLastPage() {
    this.page = this.books.totalPages as number - 1;
    this.findAllBooks();
  }

  get isLastPage():boolean {
      return this.page == this.books.totalPages as number -1;
  }
}
