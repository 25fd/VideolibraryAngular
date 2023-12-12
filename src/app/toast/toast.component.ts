import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastService } from '../toast.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-toast',
  template: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnDestroy {
  @Input() message: string = '';
  @Input() showToast: boolean = true;
  type: string = '';

  private subscriptions = new Subscription();

  constructor(private toastService: ToastService) {
    this.subscriptions.add(this.toastService.showToast$.subscribe(show => this.showToast = show));
    this.subscriptions.add(this.toastService.message$.subscribe(message => this.message = message));
    this.subscriptions.add(this.toastService.type$.subscribe(type => this.type = type));
  }

  hideToast(): void {
    this.toastService.hideToast();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}