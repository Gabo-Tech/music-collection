import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { SongService } from '../../services/song.service';
import { SongFormComponent } from './song-form.component';
import { By } from '@angular/platform-browser';

describe('SongFormComponent', () => {
  let component: SongFormComponent;
  let fixture: ComponentFixture<SongFormComponent>;
  let mockSongService: any;
  let mockRouter: any;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockSongService = {
      getSong: jest.fn(),
      updateSong: jest.fn(),
      addSong: jest.fn(),
    };

    mockRouter = {
      navigate: jest.fn(),
    };

    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: jest.fn().mockReturnValue(null),
        },
      },
    };

    await TestBed.configureTestingModule({
      declarations: [SongFormComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: SongService, useValue: mockSongService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SongFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display Add New Song when not in edit mode', () => {
    const title = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(title.textContent).toBe('Add New Song');
  });

  it('should display Edit Song when in edit mode', () => {
    mockActivatedRoute.snapshot.paramMap.get.mockReturnValue('1');
    mockSongService.getSong.mockReturnValue(
      of({
        title: 'Test Song',
        genre: ['Pop'],
        year: 2021,
        duration: 210,
        rating: 4.5,
        artist: 'Test Artist',
      })
    );

    component.ngOnInit();
    fixture.detectChanges();

    const title = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(title.textContent).toBe('Edit Song');
    expect(component.songForm.value.title).toBe('Test Song');
  });

  it('should call addSong on submit when not in edit mode', () => {
    const songFormValue = {
      title: 'New Song',
      genre: 'Pop',
      year: 2022,
      duration: 180,
      rating: 4.0,
      artist: 'New Artist',
    };

    component.songForm.setValue(songFormValue);
    mockSongService.addSong.mockReturnValue(of({}));

    component.onSubmit();

    expect(mockSongService.addSong).toHaveBeenCalledWith(songFormValue);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/songs']);
  });

  it('should call updateSong on submit when in edit mode', () => {
    mockActivatedRoute.snapshot.paramMap.get.mockReturnValue('1');
    mockSongService.getSong.mockReturnValue(
      of({
        title: 'Test Song',
        genre: ['Pop'],
        year: 2021,
        duration: 210,
        rating: 4.5,
        artist: 'Test Artist',
      })
    );

    component.ngOnInit();
    fixture.detectChanges();

    const updatedSongFormValue = {
      title: 'Updated Song',
      genre: 'Rock',
      year: 2022,
      duration: 220,
      rating: 4.8,
      artist: 'Updated Artist',
    };

    component.songForm.setValue(updatedSongFormValue);
    mockSongService.updateSong.mockReturnValue(of({}));

    component.onSubmit();

    expect(mockSongService.updateSong).toHaveBeenCalledWith(
      '1',
      updatedSongFormValue
    );
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/songs']);
  });

  it('should handle errors gracefully when adding a song', () => {
    const songFormValue = {
      title: 'New Song',
      genre: 'Pop',
      year: 2022,
      duration: 180,
      rating: 4.0,
      artist: 'New Artist',
    };

    component.songForm.setValue(songFormValue);
    mockSongService.addSong.mockReturnValue(of({ error: 'Error adding song' }));

    component.onSubmit();

    expect(mockSongService.addSong).toHaveBeenCalledWith(songFormValue);
  });

  it('should handle errors gracefully when updating a song', () => {
    mockActivatedRoute.snapshot.paramMap.get.mockReturnValue('1');
    mockSongService.getSong.mockReturnValue(
      of({
        title: 'Test Song',
        genre: ['Pop'],
        year: 2021,
        duration: 210,
        rating: 4.5,
        artist: 'Test Artist',
      })
    );

    component.ngOnInit();
    fixture.detectChanges();

    const updatedSongFormValue = {
      title: 'Updated Song',
      genre: 'Rock',
      year: 2022,
      duration: 220,
      rating: 4.8,
      artist: 'Updated Artist',
    };

    component.songForm.setValue(updatedSongFormValue);
    mockSongService.updateSong.mockReturnValue(of({ error: 'Error updating song' }));

    component.onSubmit();

    expect(mockSongService.updateSong).toHaveBeenCalledWith(
      '1',
      updatedSongFormValue
    );
  });
});
