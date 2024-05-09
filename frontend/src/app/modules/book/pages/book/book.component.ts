import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {RatingComponent} from "../../components/rating/rating.component";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {Book, BookFile, Feedback, PageableBooks, PageableFeedbacks} from "../../../../interfaces";
import {BookService} from "../../../../services/book.service";
import {ActivatedRoute, Params, Router, RouterLink} from "@angular/router";
import { HttpClient } from '@angular/common/http';
import {FeedbackService} from "../../../../services/feedback.service";

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RatingComponent,
    NgIf,
    NgForOf,
    DatePipe,
    RouterLink
  ],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent implements OnInit{
  form: FormGroup = new FormGroup({
    note: new FormControl(null, Validators.required),
    comment: new FormControl(null, Validators.required)
  })
  fileId: number | undefined = 0
  book: Book = {};
  bookId: number | undefined;
  feedbacks: PageableFeedbacks = {};
  public page = 0;
  public size = 5;
  haveElements: undefined | boolean = false;
  get bookImage(): string | undefined {
    if(this.book.image) {
      return 'data:image/jpg;base64, ' + this.book.image;
    } else
      return 'http://source.unsplash.com/user/c_v_r/1900x800';
  }
  constructor(private feedbackService: FeedbackService,private bookService: BookService, private route: ActivatedRoute, private router: Router) {
  }
  ngOnInit() {
    this.route.params.subscribe((param: Params) => {
      this.bookId = +param['bookId']
      this.bookService.getBookById(this.bookId).subscribe({
        next: (book) => {
          this.book = book;
          this.bookService.findByBookId(book.id).subscribe({
            next: (res: BookFile) => {
              this.fileId = res.id;
          }
          })
        }
      })
    })
    this.getAllFeedbacks()
  }
  private getAllFeedbacks() {
    this.feedbackService.getAll( this.bookId,{
      page: this.page,
      size: this.size
    }).subscribe({
      next: feedbacks => {
        this.feedbacks = feedbacks;
        this.haveElements = (this.feedbacks.content && this.feedbacks.content.length > 0);
      }
    })
  }

  downloadBook(fileId: number | undefined) {
    this.bookService.downloadBook(fileId)
  }

  protected readonly history = history;
  onSubmit() {
    this.feedbackService.addFeedback(this.form.value, this.bookId).subscribe( {
        next: value => {
          window.location.reload();
        }
      }
    )
  }
  goToPreviousPage() {
    this.page--;
    this.getAllFeedbacks();
  }

  goToFirstPage() {
    this.page = 0;
    this.getAllFeedbacks();
  }

  goToPage(pageIndex: number) {
    this.page = pageIndex;
    this.getAllFeedbacks();
  }

  goToNextPage() {
    this.page++;
    this.getAllFeedbacks();
  }

  goToLastPage() {
    this.page = this.feedbacks.totalPages as number - 1;
    this.getAllFeedbacks();
  }

  get isLastPage():boolean {
    return this.page == this.feedbacks.totalPages as number -1;
  }

}
