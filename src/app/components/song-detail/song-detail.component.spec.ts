import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { SongService } from 'src/app/services/song.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { SongDetailComponent } from './song-detail.component';
import { Meta, Title } from '@angular/platform-browser';

describe('SongDetailComponent', () => {
  let component: SongDetailComponent;
  let fixture: ComponentFixture<SongDetailComponent>;
  let songServiceMock: any;
  let navbarServiceMock: any;
  let activatedRouteMock: any;
  let metaService: Meta;
  let titleService: Title;

  beforeEach(waitForAsync(() => {
    songServiceMock = {
      getSong: jasmine.createSpy('getSong').and.returnValue(of({
        id: 1,
        title: 'Test Song',
        poster: 'test-poster.jpg',
        genre: ['Pop'],
        year: 2021,
        duration: 200,
        rating: 4.5,
        artist: 'Test Artist'
      }))
    };
    navbarServiceMock = { setTitle: jasmine.createSpy('setTitle') };
    activatedRouteMock = { snapshot: { paramMap: { get: jasmine.createSpy('get').and.returnValue('1') } } };

    TestBed.configureTestingModule({
      declarations: [SongDetailComponent],
      providers: [
        { provide: SongService, useValue: songServiceMock },
        { provide: NavbarService, useValue: navbarServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        Meta,
        Title
      ]
    }).compileComponents();

    metaService = TestBed.inject(Meta);
    titleService = TestBed.inject(Title);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load song details on init', () => {
    component.ngOnInit();
    component.song$.subscribe(song => {
      expect(song?.title).toBe('Test Song');
    });
    expect(songServiceMock.getSong).toHaveBeenCalledWith(1);
    expect(navbarServiceMock.setTitle).toHaveBeenCalledWith('Test Song');
  });

  it('should set meta tags on init', () => {
    component.ngOnInit();
    expect(titleService.getTitle()).toBe('Test Song - Song Details');
    expect(metaService.getTag('name="description"')?.content).toBe('Details of the song Test Song, a Pop track.');
  });

  it('should initialize progress to 100 after a delay', (done) => {
    component.ngOnInit();
    setTimeout(() => {
      expect(component.progress).toBe(100);
      done();
    }, 2000);
  });
});
