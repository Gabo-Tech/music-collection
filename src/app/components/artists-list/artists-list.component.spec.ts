import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { ArtistsListComponent } from './artists-list.component';
import { loadArtists } from 'src/app/store/actions/artist.actions';
import { selectAllArtists, selectLoading } from 'src/app/store/selectors/artist.selectors';
import { Artist } from '../../../models/artist.model';

describe('ArtistsListComponent', () => {
  let component: ArtistsListComponent;
  let fixture: ComponentFixture<ArtistsListComponent>;
  let store: MockStore;
  let mockSelectAllArtists: Observable<Artist[]>;
  let mockSelectLoading: Observable<boolean>;

  beforeEach(waitForAsync(() => {
    mockSelectAllArtists = of([
      { id: 1, name: 'Artist 1', img: 'img1.jpg', bornCity: 'City 1' },
      { id: 2, name: 'Artist 2', img: 'img2.jpg', bornCity: 'City 2' }
    ]);
    mockSelectLoading = of(false);

    TestBed.configureTestingModule({
      declarations: [ArtistsListComponent],
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectAllArtists, value: mockSelectAllArtists },
            { selector: selectLoading, value: mockSelectLoading }
          ]
        })
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadArtists action on init', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(loadArtists());
  });

  it('should display loading indicator when loading', () => {
    store.overrideSelector(selectLoading, true);
    store.refreshState();
    fixture.detectChanges();

    const loadingElement: HTMLElement = fixture.nativeElement.querySelector('div[role="alert"]');
    expect(loadingElement.textContent).toContain('Loading...');
  });

  it('should display list of artists when not loading', () => {
    store.overrideSelector(selectAllArtists, [
      { id: 1, name: 'Artist 1', img: 'img1.jpg', bornCity: 'City 1' },
      { id: 2, name: 'Artist 2', img: 'img2.jpg', bornCity: 'City 2' }
    ]);
    store.overrideSelector(selectLoading, false);
    store.refreshState();
    fixture.detectChanges();

    const artistElements: HTMLElement[] = fixture.nativeElement.querySelectorAll('li[role="listitem"]');
    expect(artistElements.length).toBe(2);
  });
});
