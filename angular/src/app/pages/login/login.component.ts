import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(32),
    ]),
  });

  constructor(private router: Router) {}

  handleSubmit() {
    if (
      this.loginForm.value.username === 'admin@admin.com' &&
      this.loginForm.value.password === 'admin123'
    ) {
      this.router.navigateByUrl('/dashboard');
    } else {
      alert('Invalid credentials!');
    }
  }
}
