import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../api.service'; // Assuming you have an ApiService
import { ToastService } from '../toast.service'; // Assuming you have a ToastService
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// import { VideoMetadataComponent } from '../video-metadata/video-metadata.component';

@Component({
  standalone: true,
  providers: [ ApiService, ToastService],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule],
  selector: 'app-file-upload-page',
  templateUrl: './file-upload-page.component.html',
  styleUrls: ['./file-upload-page.component.css']
})
export class FileUploadPageComponent {
  uploadForm: FormGroup;
  tags: string[] = [];

  constructor(
    private apiService: ApiService,
    private toastService: ToastService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.uploadForm = this.fb.group({
      file: [null],
      title: [''],
      description: [''],
      isPublic: [false],
      tags: ['']
    });
  }

  handleFileChange(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let files: FileList | null = element.files;
    if (files && files.length > 0) {
      this.uploadForm.patchValue({
        file: files[0]
      });
    }
  }

  async handleUpload(): Promise<void> {
    if (!this.uploadForm.value.file) {
      this.toastService.setMessage('Please select a file to upload');
      this.toastService.setType('error');
      this.toastService.showToast();
      return;
    }

    const formData = new FormData();
    formData.append('file', this.uploadForm.value.file);
    formData.append('title', this.uploadForm.value.title);
    formData.append('description', this.uploadForm.value.description);
    formData.append('isPublic', String(this.uploadForm.value.isPublic));
    formData.append('tags', this.tags.join(','));

    try {
      await this.apiService.uploadFile(formData).toPromise();
      this.toastService.setMessage('File uploaded successfully');
      this.toastService.setType('success');
    } catch (error) {
      console.error(error);
      this.toastService.setMessage('Error uploading the file. Please try again.');
      this.toastService.setType('error');
    }
    this.toastService.showToast();
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }
}