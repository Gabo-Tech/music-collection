import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ArtistService } from './artist.service';

describe('ArtistService', () => {
  let service: ArtistService;
  let httpMock: HttpTestingController;

  const mockArtists = [
    { id: 1, name: 'Artist 1' },
    { id: 2, name: 'Artist 2' },
  ];

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

  it('should retrieve artists from the API via GET', () => {
    service.getArtists().subscribe((artists) => {
      expect(artists.length).toBe(2);
      expect(artists).toEqual(mockArtists);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(mockArtists);
  });

  it('should retrieve a single artist by id from the API via GET', () => {
    const artistId = 1;
    const mockArtist = { id: artistId, name: 'Artist 1' };

    service.getArtist(artistId).subscribe((artist) => {
      expect(artist).toEqual(mockArtist);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/${artistId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockArtist);
  });

  it('should add a new artist via POST', () => {
    const newArtist = { name: 'New Artist' };

    service.addArtist(newArtist).subscribe((artist) => {
      expect(artist).toEqual({ id: 3, ...newArtist });
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('POST');
    req.flush({ id: 3, ...newArtist });
  });

  it('should update an artist via PUT', () => {
    const updatedArtist = { id: 1, name: 'Updated Artist' };

    service
      .updateArtist(updatedArtist.id, updatedArtist)
      .subscribe((artist) => {
        expect(artist).toEqual(updatedArtist);
      });

    const req = httpMock.expectOne(`${service['apiUrl']}/${updatedArtist.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedArtist);
  });

  it('should delete an artist via DELETE', () => {
    const artistId = 1;

    service.deleteArtist(artistId).subscribe((response) => {
      expect(response).toEqual({});
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/${artistId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
