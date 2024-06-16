import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { loadArtists } from 'src/app/store/actions/artist.actions';
import { selectAllArtists, selectLoading } from 'src/app/store/selectors/artist.selectors';
import { Artist } from '../../../models/artist.model';

@Component({
  selector: 'app-artists-list',
  templateUrl: './artists-list.component.html',
  styleUrls: ['./artists-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArtistsListComponent implements OnInit {
  artists$: Observable<Artist[]> = this.store.pipe(select(selectAllArtists));
  loading$: Observable<boolean> = this.store.pipe(select(selectLoading));

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(loadArtists());
  }

  trackById(index: number, artist: Artist): number {
    return artist.id;
  }
}
