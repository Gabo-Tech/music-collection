import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { loadArtists } from 'src/app/store/actions/artist.actions';
import {
  selectAllArtists,
  selectLoading,
} from 'src/app/store/selectors/artist.selectors';

@Component({
  selector: 'app-artists-list',
  templateUrl: './artists-list.component.html',
  styleUrls: ['./artists-list.component.scss'],
})
export class ArtistsListComponent implements OnInit {
  artists: any[] = [];
  loading$!: Observable<boolean>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.loading$ = this.store.pipe(select(selectLoading));
    this.store.pipe(select(selectAllArtists)).subscribe((artists) => {
      this.artists = artists;
    });
    this.store.dispatch(loadArtists());
  }
}
