import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Video } from '../api.service'; // Assuming you have an ApiService with Video model
import { CommonModule } from '@angular/common';
import { ShareModalComponent } from '../share-modal/share-modal.component';

@Component({
  selector: 'app-video-item',
  standalone: true,
  imports: [CommonModule, ShareModalComponent],
  templateUrl: './video-item.component.html',
  styleUrl: './video-item.component.css'
})
export class VideoItemComponent {
  @Input() video!: Video;
  showShareModal: boolean = false;

  constructor(private router: Router) {}

  handleShare(): void {
    this.showShareModal = true;
  }

  closeShareModal(): void {
    this.showShareModal = false;
  }

  handleEdit(): void {
    this.router.navigate(['/edit'], { queryParams: { file: this.video._id } });
  }
}
