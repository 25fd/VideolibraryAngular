import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService, Video, VideoList } from './api.service'; // Assuming you have an ApiService
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private videosSubject = new BehaviorSubject<VideoList>({});
  videos$: Observable<VideoList> = this.videosSubject.asObservable();

  constructor(private apiService: ApiService) {}

  getVideos(): void {
    this.apiService.getUserFilesApi().subscribe(
      (response: VideoList) => {
        this.videosSubject.next(response);
      },
      (error) => {
        console.error('Error fetching videos:', error);
      }
    );
  }



  getVideoById(id: string): Observable<Video | undefined> {
    return this.videos$.pipe(
      map((videoList: VideoList) => {
        console.log(videoList);
        return videoList.ownedFiles?.find((video: Video) => video._id === id);
      })
    );
  }

  uploadThumbnail(fileId: string, thumbnail: FormData): Promise<{message: string} | { error: string}> {
    return this.apiService.uploadThumbnail(fileId, thumbnail).toPromise();
  }
}