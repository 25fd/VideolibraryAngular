import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService, User } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);

  user$: Observable<User | null> = this.userSubject.asObservable();

  constructor(private api: ApiService) { // Assuming you have an ApiService
    this.loadUserFromLocalStorage();
  }

  private loadUserFromLocalStorage(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.userSubject.next(JSON.parse(storedUser));
    }
  }

  async login(email: string, password: string): Promise<User | { error: string }> {
    try {
      const response: User = await this.api.login({ email, password });
      this.userSubject.next(response);
      localStorage.setItem('user', JSON.stringify(response));
      return response;
    } catch (error) {
      console.error('Error logging in:', error);
      return { error: 'Login failed' };
    }
  }

  logout(): void {
    this.userSubject.next(null);
    localStorage.removeItem('user');
  }

  async register(username: string, email: string, password: string): Promise<{ message: string, error?: string }> {
    try {
      const data = await this.api.register({ username, email, password });
      return data;
    } catch (error) {
      console.error('Error registering user:', error);
      return { message: 'Registration failed', error: 'Registration error' };
    }
  }

  isAuthenticated(): boolean {
    return this.userSubject.value !== null;
  }
}