import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { EditPageComponent } from './edit-page/edit-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { FileUploadPageComponent } from './file-upload-page/file-upload-page.component';
import { VideoListComponent } from './video-list/video-list.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ToastComponent } from './toast/toast.component';
import { ToastService } from './toast.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    EditPageComponent,
    LoginPageComponent,
    SignupPageComponent,
    FileUploadPageComponent,
    VideoListComponent,
    RouterLink,
    RouterLinkActive,
    HttpClientModule,
    ToastComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'video-library-angular';
  public showToast: boolean = false;
  public toastMessage: string = '';
  constructor(public toastService: ToastService) {}
  public showToastMessage(message: string): void {
    this.toastMessage = message;
    this.showToast = true;
  
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }
  ngOnInit(): void {
    this.toastService.showToast$.subscribe(show => this.showToast = show);
    this.toastService.message$.subscribe(message => this.toastMessage = message);
    console.log(this.toastMessage);
    console.log(this.showToast);
  }
}
