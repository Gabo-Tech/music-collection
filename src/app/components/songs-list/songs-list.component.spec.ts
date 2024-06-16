import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { SongsListComponent } from './songs-list.component';
import { AppState } from 'src/app/store/app.state';
import { loadSongs } from 'src/app/store/actions/song.actions';
import { selectAllSongs, selectLoading } from 'src/app/store/selectors/song.selectors';
import { Meta, Title } from '@angular/platform-browser';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { of } from 'rxjs';

describe('SongsListComponent', () => {
  let component: SongsListComponent;
  let fixture: ComponentFixture<SongsListComponent>;
  let store: MockStore<AppState>;
  let metaService: Meta;
  let titleService: Title;
  const initialState = { songs: [], loading: false };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SongsListComponent],
      providers: [
        provideMockStore({ initialState }),
        Meta,
        Title
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    metaService = TestBed.inject(Meta);
    titleService = TestBed.inject(Title);
    store.overrideSelector(selectAllSongs, []);
    store.overrideSelector(selectLoading, false);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize observables', () => {
    expect(component.songs$).toBeDefined();
    expect(component.isLoading$).toBeDefined();
  });

  it('should dispatch loadSongs action on init', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(loadSongs());
  });

  it('should display loading spinner when loading', () => {
    store.overrideSelector(selectLoading, true);
    store.refreshState();
    fixture.detectChanges();

    const loadingElement: DebugElement = fixture.debugElement.query(By.css('div[role="alert"]'));
    expect(loadingElement).toBeTruthy();
  });

  it('should display songs when not loading', () => {
    const mockSongs = [
      { id: 1, title: 'Song 1', poster: 'poster1.jpg', genre: ['Pop'] },
      { id: 2, title: 'Song 2', poster: 'poster2.jpg', genre: ['Rock'] }
    ];
    store.overrideSelector(selectAllSongs, mockSongs);
    store.overrideSelector(selectLoading, false);
    store.refreshState();
    fixture.detectChanges();

    const songElements: DebugElement[] = fixture.debugElement.queryAll(By.css('li[role="listitem"]'));
    expect(songElements.length).toBe(mockSongs.length);
  });

  it('should initialize progress bar correctly', (done) => {
    component.ngOnInit();
    setTimeout(() => {
      expect(component.progress).toBe(100);
      done();
    }, 2000);
  });

  it('should set meta tags correctly', () => {
    component.ngOnInit();
    expect(titleService.getTitle()).toBe(component.pageTitle);
    expect(metaService.getTag('name="description"')?.content).toBe(component.pageDescription);
  });
});
