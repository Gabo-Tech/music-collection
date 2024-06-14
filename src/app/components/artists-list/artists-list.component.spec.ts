import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArtistsListComponent } from './artists-list.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AppState } from '../../store/app.state';
import {
  selectAllArtists,
  selectLoading,
} from '../../store/selectors/artist.selectors';
import { loadArtists } from '../../store/actions/artist.actions';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('ArtistsListComponent', () => {
  let component: ArtistsListComponent;
  let fixture: ComponentFixture<ArtistsListComponent>;
  let store: MockStore<AppState>;
  let dispatchSpy: jest.SpyInstance;
  const initialState = {
    artists: [],
    loading: false,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArtistsListComponent],
      imports: [RouterTestingModule],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(ArtistsListComponent);
    component = fixture.componentInstance;
    dispatchSpy = jest.spyOn(store, 'dispatch');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadArtists action on init', () => {
    expect(dispatchSpy).toHaveBeenCalledWith(loadArtists());
  });

  it('should display loading message when loading', () => {
    store.overrideSelector(selectLoading, true);
    store.refreshState();
    fixture.detectChanges();
    const loadingElement: DebugElement = fixture.debugElement.query(
      By.css('.text-center')
    );
    expect(loadingElement).toBeTruthy();
    expect(loadingElement.nativeElement.textContent.trim()).toBe('Loading...');
  });

  it('should display list of artists when not loading', () => {
    const artists = [
      { id: 1, name: 'Artist 1', img: 'img1.jpg', bornCity: 'City 1' },
      { id: 2, name: 'Artist 2', img: 'img2.jpg', bornCity: 'City 2' },
    ];
    store.overrideSelector(selectLoading, false);
    store.overrideSelector(selectAllArtists, artists);
    store.refreshState();
    fixture.detectChanges();

    const artistElements: DebugElement[] = fixture.debugElement.queryAll(
      By.css('li')
    );
    expect(artistElements.length).toBe(2);
    expect(
      artistElements[0].query(By.css('h2')).nativeElement.textContent.trim()
    ).toBe('Artist 1');
    expect(
      artistElements[1].query(By.css('h2')).nativeElement.textContent.trim()
    ).toBe('Artist 2');
  });

  it('should display artist details correctly', () => {
    const artists = [
      { id: 1, name: 'Artist 1', img: 'img1.jpg', bornCity: 'City 1' },
    ];
    store.overrideSelector(selectLoading, false);
    store.overrideSelector(selectAllArtists, artists);
    store.refreshState();
    fixture.detectChanges();

    const artistElement: DebugElement = fixture.debugElement.query(
      By.css('li')
    );
    expect(
      artistElement.query(By.css('h2')).nativeElement.textContent.trim()
    ).toBe('Artist 1');
    expect(artistElement.query(By.css('img')).nativeElement.src).toContain(
      'img1.jpg'
    );
    expect(
      artistElement.query(By.css('p')).nativeElement.textContent.trim()
    ).toBe('City 1');
  });
});
