import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { SongService } from 'src/app/services/song.service';
import {
  loadSongs,
  loadSongsSuccess,
  loadSongsFailure,
} from '../actions/song.actions';

@Injectable()
export class SongEffects {
  loadSongs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadSongs),
      mergeMap(() =>
        this.songService.getSongs().pipe(
          map((songs) => loadSongsSuccess({ songs })),
          catchError((error) => of(loadSongsFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private songService: SongService
  ) {}
}
