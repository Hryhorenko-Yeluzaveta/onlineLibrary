import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./pages/main/main.component";
import {AllBooksComponent} from "./pages/all-books/all-books.component";
import {LikedBooksComponent} from "./pages/liked-books/liked-books.component";
import {CategoryBooksComponent} from "./pages/category-books/category-books.component";
import {AddBookComponent} from "./pages/add-book/add-book.component";
import {BookComponent} from "./pages/book/book.component";
import {EditBookComponent} from "./pages/edit-book/edit-book.component";
import {AuthorPageComponent} from "./pages/author-page/author-page.component";
import {SearchedBookComponent} from "./pages/searched-book/searched-book.component";

const routes: Routes = [{
  path: '',
  component: MainComponent,
  children: [
    {path: '', component:AllBooksComponent},
     {path: "category/:categoryId", component: CategoryBooksComponent},
     {path: 'liked-books', component: LikedBooksComponent},
     {path: 'manage/:categoryId', component:AddBookComponent},
    {path: 'book/:bookId', component: BookComponent},
     {path: 'edit/:bookId', component:EditBookComponent},
    {path: 'author/:authorName', component: AuthorPageComponent},
    {path: 'search/:bookName', component: SearchedBookComponent}
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule {
}
