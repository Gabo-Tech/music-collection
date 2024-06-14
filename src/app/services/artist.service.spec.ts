import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ArtistService } from './artist.service';

describe('ArtistService', () => {
  let service: ArtistService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:3000/artists';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArtistService],
    });

    service = TestBed.inject(ArtistService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch artists', () => {
    const mockArtists = [
      { id: 1, name: 'Artist 1', genre: 'Pop' },
      { id: 2, name: 'Artist 2', genre: 'Rock' },
    ];

    service.getArtists().subscribe((artists) => {
      expect(artists.length).toBe(2);
      expect(artists).toEqual(mockArtists);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockArtists);
  });

  it('should fetch a single artist', () => {
    const mockArtist = { id: 1, name: 'Artist 1', genre: 'Pop' };

    service.getArtist(1).subscribe((artist) => {
      expect(artist).toEqual(mockArtist);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockArtist);
  });

  it('should add a new artist', () => {
    const newArtist = { name: 'New Artist', genre: 'Jazz' };

    service.addArtist(newArtist).subscribe((artist) => {
      expect(artist).toEqual(newArtist);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(newArtist);
  });

  it('should update an artist', () => {
    const updatedArtist = { id: 1, name: 'Updated Artist', genre: 'Jazz' };

    service.updateArtist(1, updatedArtist).subscribe((response) => {
      expect(response).toEqual(updatedArtist);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedArtist);
  });

  it('should delete an artist', () => {
    service.deleteArtist(1).subscribe((response) => {
      expect(response).toEqual({});
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
