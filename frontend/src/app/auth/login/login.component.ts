import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {User} from "../../interfaces";
import {AuthService} from "../../services/auth.service";
import {TokenService} from "../../services/security/token.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgForOf, NgIf, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  errorMsg?: string;
  form: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)])
  });

  constructor(private router: Router, private authService: AuthService, private tokenService: TokenService) {
  }
  register() {
   this.router.navigate(['register']);
  }
  onSubmit() {
    this.authService.login(this.form.value).subscribe({
      next: (value) => {
        this.tokenService.token = value.token as string;
        this.router.navigate(['books']);
      },
      error: (err) => {
        this.errorMsg = err.error.businessErrorDesc
      }
    })
  }
}
