import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {Observable} from "rxjs";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {Category} from "../../../../interfaces";
import {CategoryService} from "../../../../services/category.service";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../../../services/user.service";

@Component({
  selector: 'app-category-nav',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
    FormsModule,
    NgIf
  ],
  templateUrl: './category-nav.component.html',
  styleUrl: './category-nav.component.css'
})
export class CategoryNavComponent implements OnInit{
  categories$: Observable<Category[]> = new Observable<Category[]>()
  categories: Category[] = []
  isClicked: boolean = false;
  isClosed: boolean = true;
  _admin: boolean = false
  constructor(private userService: UserService, private categoryService: CategoryService, private router: Router) {
  }
  ngOnInit() {
    this.findAllCategories();
    this.isAdmin()
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
  private findAllCategories() {
    this.categories$ = this.categoryService.fetch()
    this.categories$.subscribe({
      next: (categories) => {
        this.categories = categories
      }
    })
  }
  toClose() {
    this.isClicked = true
    this.isClosed = false
  }
  protected readonly history = history;
  form: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
  });
  onSubmit() {
    this.categoryService.saveCategory(this.form.value).subscribe({
      next: value => {
        window.location.reload();
      }
    })
  }
}
