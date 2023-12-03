import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-video-metadata',
  templateUrl: './video-metadata.component.html',
  styleUrls: ['./video-metadata.component.css']
})
export class VideoMetadataComponent {
  @Input() title!: string;
  @Output() titleChange = new EventEmitter<string>();
  @Input() tags!: string[];
  @Output() tagsChange = new EventEmitter<string[]>();
  @Input() description!: string;
  @Output() descriptionChange = new EventEmitter<string>();
  @Input() isPublic!: boolean;
  @Output() isPublicChange = new EventEmitter<boolean>();

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
}