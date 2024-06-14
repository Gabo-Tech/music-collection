import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { SongService } from './song.service';

describe('SongService', () => {
  let service: SongService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:3000/songs';
  const imageApiUrl = 'https://picsum.photos/200/300';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SongService],
    });

    service = TestBed.inject(SongService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch songs with posters', () => {
    const mockSongs = [
      { id: 1, title: 'Song 1', genre: 'Pop' },
      { id: 2, title: 'Song 2', genre: 'Rock' },
    ];

    service.getSongs().subscribe((songs) => {
      expect(songs.length).toBe(2);
      expect(songs[0].poster).toContain(imageApiUrl);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockSongs);
  });

  it('should fetch a single song', () => {
    const mockSong = { id: 1, title: 'Song 1', genre: 'Pop' };

    service.getSong(1).subscribe((song) => {
      expect(song).toEqual(mockSong);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockSong);
  });

  it('should add a new song', () => {
    const newSong = { title: 'New Song', genre: 'Jazz' };

    service.addSong(newSong).subscribe((song) => {
      expect(song).toEqual(newSong);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(newSong);
  });

  it('should update a song', () => {
    const updatedSong = { id: 1, title: 'Updated Song', genre: 'Jazz' };

    service.updateSong(1, updatedSong).subscribe((response) => {
      expect(response).toEqual(updatedSong);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedSong);
  });

  it('should delete a song', () => {
    service.deleteSong(1).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
