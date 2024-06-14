import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ArtistState } from '../reducers/artist.reducer';

export const selectArtistState = createFeatureSelector<ArtistState>('artists');

export const selectAllArtists = createSelector(
  selectArtistState,
  (state: ArtistState) => state.artists
);

export const selectLoading = createSelector(
  selectArtistState,
  (state: ArtistState) => state.loading
);
