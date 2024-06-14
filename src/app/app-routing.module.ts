import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SongsListComponent } from './components/songs-list/songs-list.component';
import { SongDetailComponent } from './components/song-detail/song-detail.component';
import { SongFormComponent } from './components/song-form/song-form.component';
import { ArtistsListComponent } from './components/artists-list/artists-list.component';

const routes: Routes = [
  { path: 'songs', component: SongsListComponent, data: { title: 'SONGS' } },
  {
    path: 'songs/new',
    component: SongFormComponent,
    data: { title: 'NEW_SONG' },
  },
  { path: 'songs/:id', component: SongDetailComponent },
  {
    path: 'songs/edit/:id',
    component: SongFormComponent,
    data: { title: 'EDIT_SONG' },
  },
  {
    path: 'artists',
    component: ArtistsListComponent,
    data: { title: 'ARTISTS' },
  },
  {
    path: '',
    redirectTo: '/songs',
    pathMatch: 'full',
    data: { title: 'SONGS' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
