import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { EditPageComponent } from './edit-page/edit-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { FileUploadPageComponent } from './file-upload-page/file-upload-page.component';
import { AuthGuardService as AuthGuard } from './auth-gaurd.service'; 
import { VideoListComponent } from './video-list/video-list.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { VideoMetadataComponent } from './video-metadata/video-metadata.component';


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
    VideoMetadataComponent
  ],
  providers: [AuthGuard],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'video-library-angular';
}
