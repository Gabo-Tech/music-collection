import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SongsListComponent } from './songs-list.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Meta, Title } from '@angular/platform-browser';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SongsListComponent', () => {
  let component: SongsListComponent;
  let fixture: ComponentFixture<SongsListComponent>;
  let mockStore: MockStore;
  let mockMetaService: jasmine.SpyObj<Meta>;
  let mockTitleService: jasmine.SpyObj<Title>;

  const initialState = {
    songs: {
      songs: [
        {
          id: 1,
          title: 'Test Song 1',
          genre: ['Pop'],
          poster: 'test-poster-1.jpg',
        },
        {
          id: 2,
          title: 'Test Song 2',
          genre: ['Rock'],
          poster: 'test-poster-2.jpg',
        },
      ],
      loading: false,
    },
  };

  beforeEach(async () => {
    mockMetaService = jasmine.createSpyObj('Meta', ['updateTag']);
    mockTitleService = jasmine.createSpyObj('Title', ['setTitle']);

    await TestBed.configureTestingModule({
      declarations: [SongsListComponent],
      providers: [
        provideMockStore({ initialState }),
        { provide: Meta, useValue: mockMetaService },
        { provide: Title, useValue: mockTitleService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(SongsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadSongs action on init', () => {
    const dispatchLoadSongsActionSpy = spyOn<any>(
      component,
      'dispatchLoadSongsAction'
    ).and.callThrough();
    component.ngOnInit();
    expect(dispatchLoadSongsActionSpy).toHaveBeenCalled();
  });

  it('should set page title and meta tags on init', () => {
    component.ngOnInit();
    expect(mockTitleService.setTitle).toHaveBeenCalledWith(component.pageTitle);
    expect(mockMetaService.updateTag).toHaveBeenCalledWith({
      name: 'description',
      content: component.pageDescription,
    });
  });

  it('should generate alt text for song images', () => {
    const song = { title: 'Test Song', poster: 'test-poster.jpg' };
    expect(component.getImageAltText(song)).toBe('Test Song album cover');
  });

  it('should check if value is an array', () => {
    expect(component.isArray([1, 2, 3])).toBeTrue();
    expect(component.isArray('not an array')).toBeFalse();
  });

  it('should track song by id', () => {
    const song = { id: 1, title: 'Test Song' };
    expect(component.trackById(0, song)).toBe(1);
  });
});
