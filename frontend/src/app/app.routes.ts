import { Routes } from '@angular/router';
import {RegisterComponent} from "./auth/register/register.component";
import {ActivateAccountComponent} from "./auth/activate-account/activate-account.component";
import {LoginComponent} from "./auth/login/login.component";
import {authGuard} from "./services/security/auth.guard";

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: "full"},
  {path: 'register', component: RegisterComponent},
  {path: 'activate-account', component: ActivateAccountComponent},
  {path: 'login', component: LoginComponent},
  {path: 'books', canActivate:[authGuard], loadChildren: () => import('./modules/book/book.module').then(m => m.BookModule)}
];
