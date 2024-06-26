import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { SongsListComponent } from './components/songs-list/songs-list.component';
import { SongDetailComponent } from './components/song-detail/song-detail.component';
import { SongFormComponent } from './components/song-form/song-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { songReducer } from './store/reducers/song.reducer';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SongEffects } from './store/effects/song.effects';
import { environment } from './environments/environment';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NavbarService } from './services/navbar.service';
import { ArtistsListComponent } from './components/artists-list/artists-list.component';
import { SkeletonComponent } from './components/loaders/skeleton/skeleton.component';
import { SpinnerComponent } from './components/loaders/spinner/spinner.component';
import { ProgressBarComponent } from './components/loaders/progress-bar/progress-bar.component';
import { artistReducer } from './store/reducers/artist.reducer';
import { ArtistEffects } from './store/effects/artist.effects';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    SongsListComponent,
    SongDetailComponent,
    SongFormComponent,
    NavbarComponent,
    ArtistsListComponent,
    SkeletonComponent,
    SpinnerComponent,
    ProgressBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    StoreModule.forRoot({ songs: songReducer, artists: artistReducer }),
    EffectsModule.forRoot([SongEffects, ArtistEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [NavbarService],
  bootstrap: [AppComponent],
})
export class AppModule {}
