import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SongFormComponent } from './song-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SongService } from 'src/app/services/song.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SongFormComponent', () => {
  let component: SongFormComponent;
  let fixture: ComponentFixture<SongFormComponent>;
  let mockSongService: jasmine.SpyObj<SongService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockSongService = jasmine.createSpyObj('SongService', [
      'getSong',
      'addSong',
      'updateSong',
    ]);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockSongService.getSong.and.returnValue(
      of({
        id: 1,
        title: 'Test Song',
        genre: 'Pop',
        year: 2021,
        duration: 240,
        rating: 4.5,
        artist: 'Test Artist',
        poster: 'test-poster.jpg',
      })
    );
    mockSongService.addSong.and.returnValue(of({}));
    mockSongService.updateSong.and.returnValue(of({}));

    await TestBed.configureTestingModule({
      declarations: [SongFormComponent],
      imports: [ReactiveFormsModule, FormsModule, RouterTestingModule],
      providers: [
        { provide: SongService, useValue: mockSongService },
        { provide: Router, useValue: mockRouter },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: (key: string) => '1' } },
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SongFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with song data when editing', () => {
    expect(component.songForm.value).toEqual({
      title: 'Test Song',
      genre: 'Pop',
      year: 2021,
      duration: 240,
      rating: 4.5,
      artist: 'Test Artist',
    });
  });

  it('should set page title to "Edit Song" when editing', () => {
    expect(component.pageTitle).toBe('Edit Song');
  });

  it('should call updateSong on submit when editing', () => {
    component.onSubmit();
    expect(mockSongService.updateSong).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/songs']);
  });

  it('should call addSong on submit when not editing', () => {
    component.isEdit = false;
    component.songForm.patchValue({
      title: 'New Song',
      genre: 'Rock',
      year: 2022,
      duration: 300,
      rating: 5,
      artist: 'New Artist',
    });
    component.onSubmit();
    expect(mockSongService.addSong).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/songs']);
  });
});
