import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SongState } from '../reducers/song.reducer';

export const selectSongState = createFeatureSelector<SongState>('songs');

export const selectAllSongs = createSelector(
  selectSongState,
  (state) => state.songs
);
export const selectLoading = createSelector(
  selectSongState,
  (state) => state.loading
);
export const selectError = createSelector(
  selectSongState,
  (state) => state.error
);
