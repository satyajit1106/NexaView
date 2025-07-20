import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  signupForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(32),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(32),
    ]),
  });

  constructor(private router: Router) {}

  handleSubmit() {
    if (
      this.signupForm.value.password !== this.signupForm.value.confirmPassword
    ) {
      alert("Passwords don't match!");
    } else if (
      this.signupForm.value.username === 'admin@admin.com' &&
      this.signupForm.value.password === 'admin123'
    ) {
      this.router.navigateByUrl('/login');
    } else {
      alert('This application currently only supports single user access.');
    }
  }
}
