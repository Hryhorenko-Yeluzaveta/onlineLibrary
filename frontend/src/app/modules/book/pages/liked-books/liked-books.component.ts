import {Component, OnInit} from '@angular/core';
import {BookCardComponent} from "../../components/book-card/book-card.component";
import {NgForOf, NgIf} from "@angular/common";
import {PageableBooks} from "../../../../interfaces";
import {UserService} from "../../../../services/user.service";


@Component({
  selector: 'app-liked-books',
  standalone: true,
  imports: [
    BookCardComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './liked-books.component.html',
  styleUrl: './liked-books.component.css'
})
export class LikedBooksComponent implements OnInit{
  page: number = 0;
  size: number = 8;
  books: PageableBooks = {};
  categoryId: number = 0;
  haveElements: undefined | boolean = false;
  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.findAllLikedBooks();
  }

  private findAllLikedBooks() {
    this.userService.getAllByBook(this.page, this.size).subscribe({
          next: books => {
            this.books = books;
            this.haveElements = (this.books.content && this.books.content.length > 0);
          }
        });
  }
  goToPreviousPage() {
    this.page--;
    this.findAllLikedBooks();
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllLikedBooks();
  }

  goToPage(pageIndex: number) {
    this.page = pageIndex;
    this.findAllLikedBooks();
  }

  goToNextPage() {
    this.page++;
    this.findAllLikedBooks();
  }

  goToLastPage() {
    this.page = this.books.totalPages as number - 1;
    this.findAllLikedBooks();
  }

  get isLastPage():boolean {
    return this.page == this.books.totalPages as number -1;
  }
}
