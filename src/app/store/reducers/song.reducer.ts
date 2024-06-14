import { createReducer, on } from '@ngrx/store';
import {
  loadSongs,
  loadSongsSuccess,
  loadSongsFailure,
} from '../actions/song.actions';

export interface SongState {
  songs: any[];
  loading: boolean;
  error: any;
}

export const initialState: SongState = {
  songs: [],
  loading: false,
  error: null,
};

export const songReducer = createReducer(
  initialState,
  on(loadSongs, (state) => ({ ...state, loading: true })),
  on(loadSongsSuccess, (state, { songs }) => ({
    ...state,
    songs,
    loading: false,
  })),
  on(loadSongsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
