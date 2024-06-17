import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { ArtistsListComponent } from './artists-list.component';
import { Store, StoreModule } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import {
  selectAllArtists,
  selectLoading,
} from 'src/app/store/selectors/artist.selectors';
import { loadArtists } from 'src/app/store/actions/artist.actions';
import { AppState } from 'src/app/store/app.state';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ArtistsListComponent', () => {
  let component: ArtistsListComponent;
  let fixture: ComponentFixture<ArtistsListComponent>;
  let store: MockStore<AppState>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ArtistsListComponent],
      imports: [StoreModule.forRoot({})],
      providers: [provideMockStore()],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ArtistsListComponent);
        component = fixture.componentInstance;
        store = TestBed.inject(Store) as MockStore<AppState>;

        store.overrideSelector(selectAllArtists, []);
        store.overrideSelector(selectLoading, false);
      });
  }));

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should dispatch loadArtists action on init', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    fixture.detectChanges();
    expect(dispatchSpy).toHaveBeenCalledWith(loadArtists());
  });
});
