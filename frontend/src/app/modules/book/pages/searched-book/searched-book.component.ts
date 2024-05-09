import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {BookCardComponent} from "../../components/book-card/book-card.component";
import {Book} from "../../../../interfaces";
import {BookService} from "../../../../services/book.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-searched-book',
  standalone: true,
  imports: [
    NgIf,
    BookCardComponent,
    NgForOf
  ],
  templateUrl: './searched-book.component.html',
  styleUrl: './searched-book.component.css'
})
export class SearchedBookComponent implements OnInit {
  bookName: string = ''
  book: Book = {}
  noSuchBook: boolean = true
  constructor(private bookService: BookService, private route: ActivatedRoute) {
  }
  ngOnInit() {
    this.foundBookByName()
  }
  private foundBookByName() {
    this.route.params.subscribe((params: Params) => {
      this.bookName = params['bookName']
      this.bookService.getByName(this.bookName).subscribe({
        next: value => {
          if(value) {
            this.book = value
            console.log(value)
            this.noSuchBook = false
          } else {
            this.noSuchBook = true;
          }
        }
      })
    })
  }
}
