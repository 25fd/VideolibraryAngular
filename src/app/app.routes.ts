import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { VideoListComponent } from './video-list/video-list.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { FileUploadPageComponent } from './file-upload-page/file-upload-page.component';
import { AuthGuardService as AuthGuard } from './auth-gaurd.service';

export const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard], 
    children: [
      { path: 'home', component: VideoListComponent },
      { path: 'edit', component: EditPageComponent },
      { path: 'upload', component: FileUploadPageComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: '**', redirectTo: 'login' }
];
