import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  private apiUrl = 'http://localhost:3000/artists';

  constructor(private http: HttpClient) {}

  getArtists(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getArtist(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addArtist(artist: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, artist);
  }

  updateArtist(id: number, artist: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, artist);
  }

  deleteArtist(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
