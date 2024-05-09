import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {Observable} from "rxjs";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {UserService} from "../../../../services/user.service";
import {BookService} from "../../../../services/book.service";
import {Book} from "../../../../interfaces";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    AsyncPipe,
    NgForOf,
    FormsModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit{
  userName: string | undefined = '';
  books: Book[] = []
  searchName: string = ""
  constructor(private bookService: BookService, private router: Router, private userService: UserService) {
  }
  isActive(route: string): boolean {
    return this.router.isActive(route, true);
  }
  ngOnInit() {
    this.userService.getUser().subscribe({
      next: (user) => {
        this.userName = user.logname
      }
    })
    this.getAllBooks();
  }
  foundBook() {
    this.router.navigate(['/books/search/' + this.searchName])
  }
  getAllBooks() {
    this.bookService.getAllWithoutPag().subscribe({
      next: value => {
        this.books = value;
      }
    })
  }
  logout() {
    localStorage.clear()
    this.router.navigate(['login'])
  }

  onInput(value: any) {
    this.searchName = value;
  }
}
