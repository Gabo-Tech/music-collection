import { createReducer, on } from '@ngrx/store';
import {
  loadArtists,
  loadArtistsSuccess,
  loadArtistsFailure,
} from '../actions/artist.actions';

export interface ArtistState {
  artists: any[];
  loading: boolean;
  error: any;
}

export const initialState: ArtistState = {
  artists: [],
  loading: false,
  error: null,
};

export const artistReducer = createReducer(
  initialState,
  on(loadArtists, (state) => ({ ...state, loading: true })),
  on(loadArtistsSuccess, (state, { artists }) => ({
    ...state,
    artists,
    loading: false,
  })),
  on(loadArtistsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
