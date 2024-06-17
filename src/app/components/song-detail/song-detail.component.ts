import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SongService } from 'src/app/services/song.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { Meta, Title } from '@angular/platform-browser';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Song } from '../../../models/song.model';

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SongDetailComponent implements OnInit {
  song$: Observable<Song | null> = of(null);
  loading$ = new BehaviorSubject<boolean>(true);
  loaderType: string = '';
  progress: number = 0;

  constructor(
    private route: ActivatedRoute,
    private songService: SongService,
    private navbarService: NavbarService,
    private metaService: Meta,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.selectRandomLoader();
    this.initializeProgress();

    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const id = params.get('id');
          if (id) {
            return this.songService.getSong(+id).pipe(
              map((data: Song) => {
                this.navbarService.setTitle(data.title);
                this.setMetaTags(data.title, data.genre.join(', '));
                this.loading$.next(false);
                return data;
              }),
              catchError(() => {
                this.loading$.next(false);
                return of(null);
              })
            );
          } else {
            this.loading$.next(false);
            return of(null);
          }
        })
      )
      .subscribe((song) => (this.song$ = of(song)));
  }

  private selectRandomLoader(): void {
    const loaders = ['skeleton', 'spinner', 'progress'];
    this.loaderType = loaders[Math.floor(Math.random() * loaders.length)];
  }

  private initializeProgress(): void {
    const duration = 2000;
    const increment = 1;
    const stepTime = Math.abs(Math.floor(duration / 100));
    let currentProgress = 0;

    const timer = setInterval(() => {
      currentProgress += increment;
      if (currentProgress >= 100) {
        clearInterval(timer);
        currentProgress = 100;
      }
      this.progress = currentProgress;
    }, stepTime);
  }

  private setMetaTags(title: string, genre: string): void {
    this.titleService.setTitle(`${title} - Song Details`);
    this.metaService.updateTag({
      name: 'description',
      content: `Details of the song ${title}, a ${genre} track.`,
    });
  }
}
