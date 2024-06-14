import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ArtistService } from 'src/app/services/artist.service';
import {
  loadArtists,
  loadArtistsSuccess,
  loadArtistsFailure,
} from '../actions/artist.actions';

@Injectable()
export class ArtistEffects {
  loadArtists$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadArtists),
      mergeMap(() =>
        this.artistService.getArtists().pipe(
          map((artists) => loadArtistsSuccess({ artists })),
          catchError((error) => of(loadArtistsFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private artistService: ArtistService
  ) {}
}
