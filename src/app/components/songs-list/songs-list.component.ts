import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { loadSongs } from 'src/app/store/actions/song.actions';
import {
  selectAllSongs,
  selectLoading,
} from 'src/app/store/selectors/song.selectors';

@Component({
  selector: 'app-songs-list',
  templateUrl: './songs-list.component.html',
  styleUrls: ['./songs-list.component.scss'],
})
export class SongsListComponent implements OnInit {
  songs: any[] = [];
  loading$!: Observable<boolean>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.loading$ = this.store.pipe(select(selectLoading));
    this.store.pipe(select(selectAllSongs)).subscribe((songs) => {
      this.songs = songs;
    });
    this.store.dispatch(loadSongs());
  }
}
