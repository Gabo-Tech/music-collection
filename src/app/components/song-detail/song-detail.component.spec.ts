import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SongDetailComponent } from './song-detail.component';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, BehaviorSubject } from 'rxjs';
import { SongService } from 'src/app/services/song.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Song } from '../../../models/song.model';

describe('SongDetailComponent', () => {
  let component: SongDetailComponent;
  let fixture: ComponentFixture<SongDetailComponent>;
  let mockSongService: jasmine.SpyObj<SongService>;
  let mockNavbarService: jasmine.SpyObj<NavbarService>;
  let mockMetaService: jasmine.SpyObj<Meta>;
  let mockTitleService: jasmine.SpyObj<Title>;
  let routeSubject = new BehaviorSubject({
    id: '1',
  });

  const mockSong: Song = {
    id: 1,
    title: 'Test Song',
    genre: ['Pop'],
    year: 2021,
    duration: 240,
    rating: 4.5,
    artist: 'Test Artist',
    poster: 'test-poster.jpg',
  };

  beforeEach(async () => {
    mockSongService = jasmine.createSpyObj('SongService', ['getSong']);
    mockNavbarService = jasmine.createSpyObj('NavbarService', ['setTitle']);
    mockMetaService = jasmine.createSpyObj('Meta', ['updateTag']);
    mockTitleService = jasmine.createSpyObj('Title', ['setTitle']);

    await TestBed.configureTestingModule({
      declarations: [SongDetailComponent],
      imports: [RouterTestingModule, TranslateModule.forRoot()],
      providers: [
        { provide: SongService, useValue: mockSongService },
        { provide: NavbarService, useValue: mockNavbarService },
        { provide: Meta, useValue: mockMetaService },
        { provide: Title, useValue: mockTitleService },
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of(new Map(Object.entries({ id: '1' }))) },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SongDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a loading spinner when loading', () => {
    component.loaderType = 'spinner';
    component.loading$.next(true);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-spinner-loader')).toBeTruthy();
  });

  it('should display a skeleton loader when loading', () => {
    component.loaderType = 'skeleton';
    component.loading$.next(true);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-skeleton-loader')).toBeTruthy();
  });

  it('should display a progress bar when loading', () => {
    component.loaderType = 'progress';
    component.loading$.next(true);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-progress-bar')).toBeTruthy();
  });

  it('should display song details when loaded', () => {
    mockSongService.getSong.and.returnValue(of(mockSong));
    component.ngOnInit();
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('img').src).toContain('test-poster.jpg');
    expect(compiled.querySelector('h1').textContent).toContain('Test Song');
    expect(compiled.querySelector('p').textContent).toContain('Pop');
  });

  it('should set the meta tags and title', () => {
    mockSongService.getSong.and.returnValue(of(mockSong));
    component.ngOnInit();
    fixture.detectChanges();
    expect(mockNavbarService.setTitle).toHaveBeenCalledWith('Test Song');
    expect(mockTitleService.setTitle).toHaveBeenCalledWith(
      'Test Song - Song Details'
    );
    expect(mockMetaService.updateTag).toHaveBeenCalledWith({
      name: 'description',
      content: 'Details of the song Test Song, a Pop track.',
    });
  });

  it('should handle song not found', () => {
    mockSongService.getSong.and.returnValue(of(null));
    component.ngOnInit();
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('img')).toBeNull();
    expect(compiled.querySelector('h1')).toBeNull();
  });
});
