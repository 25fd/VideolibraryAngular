import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VideoService } from '../video.service'; 
import { ToastService } from '../toast.service';
@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  selector: 'app-video-metadata',
  templateUrl: './video-metadata.component.html',
  styleUrls: ['./video-metadata.component.css']
})
export class VideoMetadataComponent {
  constructor(private videoService: VideoService, private toastService: ToastService) {}
  @Input() title!: string;
  @Output() titleChange = new EventEmitter<string>();
  @Input() tags!: string[];
  @Output() tagsChange = new EventEmitter<string[]>();
  @Input() description!: string;
  @Output() descriptionChange = new EventEmitter<string>();
  @Input() isPublic!: boolean;
  @Output() isPublicChange = new EventEmitter<boolean>();
  selectedFile?: File;
  fileId?: string;

  handleTitleChange(value: string): void {
    this.titleChange.emit(value);
  }

  handleTagsChange(value: string): void {
    this.tagsChange.emit(value.split(',').map(tag => tag.trim()));
  }

  handleDescriptionChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.descriptionChange.emit(input.value);
  }

  handleIsPublicChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.isPublicChange.emit(input.checked);
  }
  async handleUpload(): Promise<void> {
    if (!this.selectedFile || !this.fileId) {
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    const response = await this.videoService.uploadThumbnail(this.fileId, formData);
    if ('error' in response) {
      console.error(response.error);
      this.toastService.setMessage(response.error);
      this.toastService.setType('error');
    } else {
      this.toastService.setMessage('Thumbnail uploaded');
      this.toastService.setType('success');
    }
  }
  handleFileChange(event: Event): void {
    const element = event.target as HTMLInputElement;
    let files: FileList | null = element.files;
    if (files && files.length > 0) {
      this.selectedFile = files[0];
    }
  }
}