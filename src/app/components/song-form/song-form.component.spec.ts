import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { SongService } from 'src/app/services/song.service';
import { SongFormComponent } from './song-form.component';

describe('SongFormComponent', () => {
  let component: SongFormComponent;
  let fixture: ComponentFixture<SongFormComponent>;
  let songServiceMock: any;
  let routerMock: any;
  let activatedRouteMock: any;

  beforeEach(waitForAsync(() => {
    songServiceMock = {
      getSong: jasmine.createSpy('getSong').and.returnValue(of({ title: 'Test Song', genre: 'Pop', year: 2021, duration: 200, rating: 4.5, artist: 'Test Artist' })),
      addSong: jasmine.createSpy('addSong').and.returnValue(of({})),
      updateSong: jasmine.createSpy('updateSong').and.returnValue(of({}))
    };
    routerMock = { navigate: jasmine.createSpy('navigate') };
    activatedRouteMock = { snapshot: { paramMap: { get: jasmine.createSpy('get').and.returnValue('1') } } };

    TestBed.configureTestingModule({
      declarations: [SongFormComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: SongService, useValue: songServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values for new song', () => {
    activatedRouteMock.snapshot.paramMap.get.and.returnValue(null);
    component.ngOnInit();
    expect(component.songForm.value).toEqual({ title: '', genre: '', year: '', duration: '', rating: '', artist: '' });
    expect(component.isEdit).toBeFalse();
  });

  it('should initialize the form with existing song values for edit', () => {
    component.ngOnInit();
    expect(component.songForm.value).toEqual({ title: 'Test Song', genre: 'Pop', year: 2021, duration: 200, rating: 4.5, artist: 'Test Artist' });
    expect(component.isEdit).toBeTrue();
  });

  it('should disable submit button if form is invalid', () => {
    const submitButton: HTMLButtonElement = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(submitButton.disabled).toBeTrue();
  });

  it('should enable submit button if form is valid', () => {
    component.songForm.setValue({ title: 'Test Song', genre: 'Pop', year: 2021, duration: 200, rating: 4.5, artist: 'Test Artist' });
    fixture.detectChanges();
    const submitButton: HTMLButtonElement = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(submitButton.disabled).toBeFalse();
  });

  it('should call addSong on submit for new song', () => {
    activatedRouteMock.snapshot.paramMap.get.and.returnValue(null);
    component.ngOnInit();
    component.songForm.setValue({ title: 'New Song', genre: 'Rock', year: 2022, duration: 180, rating: 4.8, artist: 'New Artist' });
    fixture.detectChanges();
    component.onSubmit();
    expect(songServiceMock.addSong).toHaveBeenCalledWith({ title: 'New Song', genre: 'Rock', year: 2022, duration: 180, rating: 4.8, artist: 'New Artist' });
    expect(routerMock.navigate).toHaveBeenCalledWith(['/songs']);
  });

  it('should call updateSong on submit for existing song', () => {
    component.ngOnInit();
    component.songForm.setValue({ title: 'Updated Song', genre: 'Jazz', year: 2023, duration: 240, rating: 5, artist: 'Updated Artist' });
    fixture.detectChanges();
    component.onSubmit();
    expect(songServiceMock.updateSong).toHaveBeenCalledWith(1, { title: 'Updated Song', genre: 'Jazz', year: 2023, duration: 240, rating: 5, artist: 'Updated Artist' });
    expect(routerMock.navigate).toHaveBeenCalledWith(['/songs']);
  });

  it('should initialize progress to 100 after a delay', (done) => {
    component.ngOnInit();
    setTimeout(() => {
      expect(component.progress).toBe(100);
      done();
    }, 2000);
  });
});
