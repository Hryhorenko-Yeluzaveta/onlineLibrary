import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router, RouterLink} from "@angular/router";
import {Book} from "../../../../interfaces";
import {BookService} from "../../../../services/book.service";
import {CategoryService} from "../../../../services/category.service";

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    FormsModule,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent implements OnInit {
  constructor(private router: Router, private bookService: BookService, private route: ActivatedRoute, private  categoryService: CategoryService) {
  }
  errorMessage: Array<String> = []
  selectedPicture: string | undefined;
  selectedBookImage: any;
  selectedBookFile: any;
  categoryId: number = 0;
  bookId: number = 0;
  form: FormGroup = new FormGroup({
    title: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    author: new FormControl(null, Validators.required),
    bookYear: new FormControl(null, Validators.required)
  })
  ngOnInit() {
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
  //  this.form.value.bookFile = this.selectedBookFile
  }

  protected readonly history = history;

  onSubmit() {
    if (this.selectedBookImage instanceof Blob && this.form.value) {
      const formData = new FormData();
      formData.append('image', this.selectedBookImage as Blob);
      formData.append('title', this.form.get('title')?.value as string);
      formData.append('description', this.form.get('description')?.value as string);
      formData.append('author', this.form.get('author')?.value as string);
      formData.append('bookFile', this.selectedBookFile as Blob)
      formData.append('bookYear', this.form.get('bookYear')?.value.toString() || '');
      this.route.params.subscribe((params: Params) => {
        this.categoryId = +params['categoryId'];
        this.bookService.saveBook(formData, this.categoryId).subscribe({
          next: (book: Book) => {
            this.router.navigate(['/books/book/'+ book.id]);
          }
        });
      });
    } else {
      console.error('Selected image is not a Blob or bookRequest is undefined');
    }
  }
}
