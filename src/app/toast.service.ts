import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private showToastSubject = new BehaviorSubject<boolean>(false);
  private messageSubject = new BehaviorSubject<string>('');
  private typeSubject = new BehaviorSubject<string>('');

  showToast$ = this.showToastSubject.asObservable();
  message$ = this.messageSubject.asObservable();
  type$ = this.typeSubject.asObservable();

  constructor() {}

  public showToast(): void {
    this.showToastSubject.next(true);
  }

  public hideToast(): void {
    this.showToastSubject.next(false);
  }

  public setMessage(message: string): void {
    this.messageSubject.next(message);
  }

  public setType(type: string): void {
    this.typeSubject.next(type);
  }
}