import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiService } from '../api.service'; // Assuming you have an ApiService
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-share-modal',
  standalone: true,
  providers: [ApiService],
  imports: [CommonModule],
  templateUrl: './share-modal.component.html',
  styleUrl: './share-modal.component.css'
})
export class ShareModalComponent {
  @Input() fileId!: string;
  @Output() onClose = new EventEmitter<void>();
  email: string = '';

  constructor(private apiService: ApiService) {}

  handleConfirm(): void {
    this.apiService.shareFileApi(this.fileId, this.email, true, true).subscribe(() => {
      this.onClose.emit();
    });
  }

  handleClose(): void {
    this.onClose.emit();
  }
}
