import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  user: { username: string; email: string; password: string };
  token: string;
}

export interface Video {
  name: string;
  title: string;
  description: string;
  tags: string;
  url: string;
  thumbnailUrl: string;
  isPublic: boolean;
  _id: string;
}

export interface VideoList {
  ownedFiles?: Video[],
  sharedFiles?: Video[],
  publicFiles?: Video[],
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private BASE_URL = 'https://video-library-backend-falguns-projects.vercel.app/api';
  // private BASE_URL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const user = localStorage.getItem('user');
    const token = user ? JSON.parse(user).token : '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${token}`
    });
  }

  register(userData: { email: string; password: string; username: string }): Observable<any> {
    return this.http.post<{ message: string, error?: string}>(`${this.BASE_URL}/user/register`, userData);
  }

  login(userData: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.BASE_URL}/user/login`, userData);
  }

  uploadFile(fileData: FormData): Observable<any> {
    const headers = this.getAuthHeaders().delete('Content-Type'); // Remove Content-Type for FormData
    return this.http.post(`${this.BASE_URL}/file/upload`, fileData, { headers });
  }

  getUserFilesApi(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.BASE_URL}/file/user-files`, { headers });
  }

  shareFileApi(fileId: string, email: string, read: boolean, write: boolean): Observable<any> {
    const shareData = { email, read, write };
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.BASE_URL}/file/share/${fileId}`, shareData, { headers });
  }

  deleteFileApi(fileId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.BASE_URL}/file/delete/${fileId}`, { headers });
  }

  updateFileApi(fileId: string, fileData: object): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.BASE_URL}/file/update/${fileId}`, fileData, { headers });
  }

  uploadThumbnail(fileId: string, thumbnail: FormData): Observable<any> {
    const headers = this.getAuthHeaders().delete('Content-Type');
    return this.http.post(`${this.BASE_URL}/file/upload-thumbnail/${fileId}`, thumbnail, { headers });
  }
}