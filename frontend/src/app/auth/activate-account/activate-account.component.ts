import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";
import {AuthService} from "../../services/auth.service";
import {Activate} from "../../interfaces";
import {CodeInputModule} from "angular-code-input";

@Component({
  selector: 'app-activate-account',
  standalone: true,
  imports: [
    CodeInputModule,
    NgIf
  ],
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.css'
})
export class ActivateAccountComponent {

  message = '';
  isOkay = true;
  submitted = false;

  constructor(private router: Router, private authService: AuthService) {}


  onCodeCompleted(token: string) {
      this.confirmAccount(token);
   }

  redirectToLogin() {
    this.router.navigate(['login'])
  }

  private confirmAccount(token: string) {
    this.authService.confirm({
      token
    }).subscribe({
      next: () => {
        this.message = 'Ваш аккаунт було успішно активовано.\nТепер Ви можете авторизуватися'
        this.submitted = true;
        this.isOkay = true;
      },
      error: () => {
      this.message = 'Було введено неправильний код активації, або час існування коду активації вже сплинув.'
      this.submitted = true;
      this.isOkay=false;
    }
    })
  }
}
