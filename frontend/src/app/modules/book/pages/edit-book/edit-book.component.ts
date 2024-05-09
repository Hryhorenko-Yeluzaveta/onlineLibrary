import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, Params, Route, Router} from "@angular/router";
import {BookService} from "../../../../services/book.service";
import {CategoryService} from "../../../../services/category.service";
import {Book} from "../../../../interfaces";

@Component({
  selector: 'app-edit-book',
  standalone: true,
    imports: [
        FormsModule,
        NgForOf,
        NgIf,
        ReactiveFormsModule
    ],
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.css'
})
export class EditBookComponent implements OnInit {

  protected readonly history = history;
  constructor(private router: Router, private bookService: BookService, private route: ActivatedRoute, private  categoryService: CategoryService) {
  }
  errorMessage: Array<String> = []
  selectedPicture: string | undefined;
  selectedBookImage: any;
  selectedBookFile: any;
  bookId: number = 0;
  bookRequest: Book = {
    title: "",
    description: '',
    author: "",
    bookYear: 2000,
    bookFile: undefined
  };
  ngOnInit() {
    this.getBookById();
  }
  getBookById() {
    this.route.params.subscribe((params: Params) => {
      this.bookId = +params['bookId']
      this.bookService.getBookById(this.bookId).subscribe({
        next: book => {
          this.bookRequest.id = this.bookId
          this.bookRequest.title = book.title
          this.bookRequest.description = book.description
          this.bookRequest.author = book.author
          this.bookRequest.bookYear = book.bookYear
          this.selectedBookImage = book.image
          if(book.image) {
            this.selectedPicture = "data:image/jpg;base64, " + book.image
          }
        }
      })
    })
  }
  updateBook() {
    this.route.params.subscribe((params: Params) => {
      this.bookId = +params['bookId']
      if (this.selectedBookImage instanceof Blob && this.bookRequest) {
        const formData = new FormData();
          formData.append('image', this.selectedBookImage as Blob);
        formData.append('title', this.bookRequest.title as string);
        formData.append('description', this.bookRequest.description as string);
        formData.append('author', this.bookRequest.author as string);
        if (this.selectedBookFile !== null && this.selectedBookFile !== undefined) {
          formData.append('bookFile', this.selectedBookFile as Blob);
        }
        formData.append('bookYear', this.bookRequest.bookYear?.toString() || '');
        this.bookService.updateBook(this.bookId, formData).subscribe({
          next: book => {
            this.router.navigate(['/books/book/'+ book.id]);
          }
        });
      }
    })
  }

  onFileSelected(event: any) {
    this.selectedBookImage = event.target.files[0];
    console.log("Файл книги" + this.selectedBookImage);
    if (this.selectedBookImage) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedPicture = reader.result as string;
      }
      reader.readAsDataURL(this.selectedBookImage);
    }
  }
  onBookSelected(event: any) {
    this.selectedBookFile = event.target.files[0];
    this.bookRequest.bookFile = this.selectedBookFile
  }
}
