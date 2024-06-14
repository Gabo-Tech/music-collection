import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SongService {
  private apiUrl = 'http://localhost:3000/songs';
  private imageApiUrl = 'https://picsum.photos/200/300';

  constructor(private http: HttpClient) {}

  getSongs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((songs) =>
        songs.map((song) => ({
          ...song,
          poster: `${this.imageApiUrl}?random=${Math.floor(Math.random() * 1000)}`,
        }))
      )
    );
  }

  getSong(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addSong(song: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, song);
  }

  updateSong(id: number, song: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, song);
  }

  deleteSong(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
