import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {RatingComponent} from "../../components/rating/rating.component";
import {Book, BookFile, Feedback, PageableBooks, PageableFeedbacks} from "../../../../interfaces";
import {FeedbackService} from "../../../../services/feedback.service";
import {BookService} from "../../../../services/book.service";
import {ActivatedRoute, Params, Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-author-page',
  standalone: true,
  imports: [
    NgIf,
    RatingComponent,
    NgForOf,
    RouterLink
  ],
  templateUrl: './author-page.component.html',
  styleUrl: './author-page.component.css'
})
export class AuthorPageComponent implements OnInit{
  fileId: number | undefined = 0
  book: Book = {};
  authorName: string | undefined


  books: PageableBooks = {};
  public page = 0;
  public size = 5;
  haveElements: undefined | boolean = false;
  constructor(private bookService: BookService, private route: ActivatedRoute, private router: Router) {
  }
  ngOnInit() {
    this.getBooksByAuthor();
  }

  getBooksByAuthor() {
    this.authorName = this.route.snapshot.params['authorName'];
    if(this.authorName) {
      this.bookService.getByAuthor(this.authorName).subscribe({
        next: book => {
          this.books = book
          this.haveElements = (this.books.content && this.books.content.length > 0);
        }
      })
    }
  }

  downloadBook(fileId: number | undefined) {
    this.bookService.downloadBook(fileId)
  }
  goToPreviousPage() {
    this.page--;
    this.getBooksByAuthor();
  }

  goToFirstPage() {
    this.page = 0;
    this.getBooksByAuthor();
  }

  goToPage(pageIndex: number) {
    this.page = pageIndex;
    this.getBooksByAuthor();
  }

  goToNextPage() {
    this.page++;
    this.getBooksByAuthor();
  }

  goToLastPage() {
    this.page = this.books.totalPages as number - 1;
    this.getBooksByAuthor();
  }

  get isLastPage():boolean {
    return this.page == this.books.totalPages as number -1;
  }
}
