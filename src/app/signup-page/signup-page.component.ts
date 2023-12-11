import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service'; // Assuming you have an AuthService
import { ToastService } from '../toast.service'; // Assuming you have a ToastService
import { CommonModule } from '@angular/common';
import { ToastComponent } from '../toast/toast.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true,
  providers: [AuthService, ToastService],
  imports: [ReactiveFormsModule,CommonModule, ToastComponent, HttpClientModule],
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent {
  signupForm: FormGroup;
  confirmPasswordMsg: string = '';

  constructor(
    private authService: AuthService,
    public toastService: ToastService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  handleConfirmPassword(): void {
    if (this.signupForm.value.password !== this.signupForm.value.confirmPassword) {
      this.confirmPasswordMsg = 'Passwords do not match';
    } else {
      this.confirmPasswordMsg = '';
    }
  }

  async handleSignup(): Promise<void> {
    if (this.signupForm.valid && this.confirmPasswordMsg === '') {
      try {
        const { username, email, password } = this.signupForm.value;
        const response = await this.authService.register(username, email, password);
        if (response.error) {
          this.toastService.setMessage(response.error);
          this.toastService.setType('error');
        } else {
          this.toastService.setMessage(response.message);
          this.toastService.setType('success');
          this.router.navigate(['/login']);
        }
      } catch (error) {
        console.error(error);
      }
      this.toastService.showToast();
    }
  }
}