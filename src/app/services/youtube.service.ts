import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private url = 'https://www.googleapis.com/youtube/v3';
  private apiKey = 'AIzaSyC0sFrzdkQz8ftmZbx0ZJCxUxl8AKcbJyo';
  private playlist = 'UUNYW2vfGrUE6R5mIJYzkRyQ';

  private nextPageToken: string;

  constructor(public http: Http) { }

  getVideos() {
    let url = `${this.url}/playlistItems`;
    let params = new URLSearchParams();

    params.set('part', 'snippet');
    params.set('maxResults', '10');
    params.set('playlistId', this.playlist);
    params.set('key', this.apiKey);

    if (this.nextPageToken) {
      params.set('pageToken', this.nextPageToken);
    }

    return this.http.get(url, {search: params})
      .pipe(map(res => {
        this.nextPageToken = res.json().nextPageToken;

        let videos: any[] = [];
        for (let video of res.json().items) {
          let snippet = video.snippet;
          videos.push(snippet);
        }
        
        return videos;
      }));
  }
}
