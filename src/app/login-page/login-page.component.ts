import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; // Assuming you have an AuthService
import { ToastService } from '../toast.service'; // Assuming you have a ToastService
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastComponent } from '../toast/toast.component';

@Component({
  standalone: true,
  providers: [AuthService, ToastService],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule, ToastComponent],
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    public toastService: ToastService,
    private router: Router
  ) {}

  async handleLogin(): Promise<void> {
    try {
      const response = await this.authService.login(this.email, this.password);
      if ('error' in response) {
        console.error(response.error);
        this.toastService.setMessage(response.error);
        this.toastService.setType('error');
      } else {
        this.toastService.setMessage('Login successful');
        this.toastService.setType('success');
        console.log("Login successful neviagating to home");
        this.router.navigate(['/home']);
      }
      this.toastService.showToast();
    } catch (error) {
      console.error(error);
    }
  }
}