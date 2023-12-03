import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VideoService } from '../video.service'; // Assuming you have a VideoService
import { Video } from '../api.service'; // Assuming you have an ApiService with Video model
import { CommonModule } from '@angular/common';
import { VideoMetadataComponent } from '../video-metadata/video-metadata.component';

@Component({
  standalone: true,
  providers: [VideoService],
  imports: [CommonModule, VideoMetadataComponent],
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit {
  video!: Video;
  tags: string[] = [];

  constructor(
    private videoService: VideoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const fileId = this.route.snapshot.queryParamMap.get('file');
    if (fileId) {
      this.videoService.getVideoById(fileId).subscribe((video: Video | undefined) => {
        if (video) {
          this.video = video;
          this.tags = video.tags;
        }
      });
    }
  }

  handleSubmit(): void {
    const metadata = {
      title: this.video.title,
      description: this.video.description,
      isPublic: this.video.isPublic,
      tags: this.tags,
    };
    // Call the VideoService to update the video metadata
    // Handle the response and errors
  }

  handleGoBack(): void {
    this.router.navigate(['/home']);
  }
}