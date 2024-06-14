import { createAction, props } from '@ngrx/store';

export const loadArtists = createAction('[Artist List] Load Artists');

export const loadArtistsSuccess = createAction(
  '[Artist List] Load Artists Success',
  props<{ artists: any[] }>()
);

export const loadArtistsFailure = createAction(
  '[Artist List] Load Artists Failure',
  props<{ error: any }>()
);
