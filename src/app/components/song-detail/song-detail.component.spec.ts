import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SongService } from '../../services/song.service';
import { NavbarService } from '../../services/navbar.service';
import { SongDetailComponent } from './song-detail.component';
import { By } from '@angular/platform-browser';

describe('SongDetailComponent', () => {
  let component: SongDetailComponent;
  let fixture: ComponentFixture<SongDetailComponent>;
  let mockSongService: any;
  let mockNavbarService: any;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockSongService = {
      getSong: jest.fn(),
    };

    mockNavbarService = {
      setTitle: jest.fn(),
    };

    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: jest.fn().mockReturnValue('1'),
        },
      },
    };

    await TestBed.configureTestingModule({
      declarations: [SongDetailComponent],
      providers: [
        { provide: SongService, useValue: mockSongService },
        { provide: NavbarService, useValue: mockNavbarService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SongDetailComponent);
    component = fixture.componentInstance;
    mockSongService.getSong.mockReturnValue(
      of({
        poster: 'test-poster-url',
        title: 'Test Song',
        genre: ['Pop', 'Rock'],
        year: 2021,
        duration: 210,
        rating: 4.5,
        artist: 'Test Artist',
      })
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set loading to false and call setTitle on ngOnInit', () => {
    component.ngOnInit();
    expect(component.loading).toBe(false);
    expect(mockNavbarService.setTitle).toHaveBeenCalledWith('Test Song');
  });

  it('should display loading message when loading is true', () => {
    component.loading = true;
    fixture.detectChanges();
    const loadingDiv = fixture.debugElement.query(By.css('.text-center'));
    expect(loadingDiv).toBeTruthy();
    expect(loadingDiv.nativeElement.textContent).toContain('Loading...');
  });

  it('should display song details when loading is false', () => {
    component.loading = false;
    fixture.detectChanges();

    const img = fixture.debugElement.query(By.css('img')).nativeElement;
    const title = fixture.debugElement.query(By.css('h1')).nativeElement;
    const genre = fixture.debugElement.query(By.css('.genre')).nativeElement;

    expect(img.src).toContain('test-poster-url');
    expect(img.alt).toBe('Test Song');
    expect(title.textContent).toBe('Test Song');
    expect(genre.textContent).toContain('Pop, Rock');
  });

  it('should handle errors gracefully', () => {
    mockSongService.getSong.mockReturnValueOnce(of(null));
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.loading).toBe(false);
    const errorDiv = fixture.debugElement.query(By.css('.error-message'));
    expect(errorDiv).toBeTruthy();
    expect(errorDiv.nativeElement.textContent).toContain('Error loading song details');
  });
});
