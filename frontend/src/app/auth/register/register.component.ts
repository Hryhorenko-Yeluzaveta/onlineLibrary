import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {User} from "../../interfaces";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  errorMsg?: string;
  form: FormGroup = new FormGroup({
    logname:new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z0-9]*'), Validators.minLength(3), Validators.maxLength(10)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)])
  })
  constructor(private router: Router, private authService: AuthService) {
  }
  login() {
    this.router.navigate(['login']);
  }
  onSubmit() {
    this.authService.register(this.form.value).subscribe({
      next: () => {
        this.router.navigate(['activate-account'])
      },
      error: (err : any) => {
        this.errorMsg = err.error.error;
      }
    })
  }
}
