import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { By } from '@angular/platform-browser';
import { SongsListComponent } from './songs-list.component';
import { loadSongs } from '../../store/actions/song.actions';
import { selectAllSongs, selectLoading } from '../../store/selectors/song.selectors';
import { RouterTestingModule } from '@angular/router/testing';

describe('SongsListComponent', () => {
  let component: SongsListComponent;
  let fixture: ComponentFixture<SongsListComponent>;
  let store: MockStore;
  const initialState = {
    songs: [],
    loading: false,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SongsListComponent],
      imports: [RouterTestingModule],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SongsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display loading message when loading is true', () => {
    store.overrideSelector(selectLoading, true);
    store.refreshState();
    fixture.detectChanges();

    const loadingDiv = fixture.debugElement.query(By.css('.text-center'));
    expect(loadingDiv).toBeTruthy();
    expect(loadingDiv.nativeElement.textContent).toContain('Loading...');
  });

  it('should display songs list when loading is false', () => {
    const songs = [
      {
        id: 1,
        title: 'Test Song 1',
        genre: ['Pop'],
        poster: 'test-poster-url-1',
      },
      {
        id: 2,
        title: 'Test Song 2',
        genre: ['Rock'],
        poster: 'test-poster-url-2',
      },
    ];
    store.overrideSelector(selectLoading, false);
    store.overrideSelector(selectAllSongs, songs);
    store.refreshState();
    fixture.detectChanges();

    const songItems = fixture.debugElement.queryAll(By.css('li'));
    expect(songItems.length).toBe(songs.length);

    songItems.forEach((item, index) => {
      const song = songs[index];
      const title = item.query(By.css('h2')).nativeElement;
      const genre = item.query(By.css('p')).nativeElement;
      const img = item.query(By.css('img')).nativeElement;

      expect(title.textContent).toBe(song.title);
      expect(genre.textContent).toBe(song.genre.join(', '));
      expect(img.src).toContain(song.poster);
    });
  });

  it('should dispatch loadSongs action on init', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(loadSongs());
  });
});
