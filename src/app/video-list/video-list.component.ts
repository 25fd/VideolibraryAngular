import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VideoService } from '../video.service';
import { VideoList } from '../api.service';
import { CommonModule } from '@angular/common';
import { VideoItemComponent } from '../video-item/video-item.component';

@Component({
  standalone: true,
  providers: [VideoService],
  imports: [CommonModule, VideoItemComponent],
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit {
  videoList: VideoList = {};

  constructor(private videoService: VideoService, private router: Router) {}

  ngOnInit(): void {
    this.videoService.getVideos();
    this.videoService.videos$.subscribe((videos: VideoList) => {
      this.videoList = videos;
    });
  }

  handleSearch(query: string): void {
    // Implement search functionality if needed
  }

  handleLogout(): void {
    // Implement logout functionality using AuthService
    this.router.navigate(['/login']);
  }

  onUploadClick(): void {
    this.router.navigate(['/upload']);
  }
}