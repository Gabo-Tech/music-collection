import { Component, OnInit, ChangeDetectionStrategy, Inject, PLATFORM_ID } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, BehaviorSubject, combineLatest, of } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { loadSongs } from 'src/app/store/actions/song.actions';
import { selectAllSongs, selectLoading } from 'src/app/store/selectors/song.selectors';
import { Meta, Title } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-song-list',
  templateUrl: './songs-list.component.html',
  styleUrls: ['./songs-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SongsListComponent implements OnInit {
  songs$: Observable<any[]> = this.store.pipe(select(selectAllSongs));
  isLoading$: Observable<boolean> = this.store.pipe(select(selectLoading));
  loaderType: string = '';
  progress: number = 0;
  pageTitle: string = 'Music Collection - Browse Songs';
  pageDescription: string = 'Discover a wide range of music tracks across various genres in our music collection.';
  private imagesLoaded$ = new BehaviorSubject<boolean>(false);
  allImagesLoaded$: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    private metaService: Meta,
    private titleService: Title,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.allImagesLoaded$ = combineLatest([this.isLoading$, this.imagesLoaded$]).pipe(
      map(([loading, imagesLoaded]) => !loading && imagesLoaded)
    );
  }

  ngOnInit(): void {
    this.dispatchLoadSongsAction();
    this.selectRandomLoader();
    this.initializeProgress();
    this.setMetaTags();
  }

  /**
   * Dispatches the action to load songs.
   */
  private dispatchLoadSongsAction(): void {
    this.store.dispatch(loadSongs());
  }

  /**
   * Selects a random loader type from available options.
   */
  private selectRandomLoader(): void {
    const loaderOptions = ['skeleton', 'spinner', 'progress'];
    this.loaderType = loaderOptions[Math.floor(Math.random() * loaderOptions.length)];
  }

  /**
   * Initializes the progress bar animation.
   */
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

  /**
   * TrackBy function to optimize ngFor performance.
   * @param index The index of the current item.
   * @param item The current item.
   * @returns The unique identifier for the item.
   */
  trackById(index: number, item: any): number {
    return item.id;
  }

  /**
   * Generates alt text for song images.
   * @param song The song object.
   * @returns The alt text for the image.
   */
  getImageAltText(song: any): string {
    return `${song.title} album cover`;
  }

  /**
   * Helper method to check if a value is an array.
   * @param value The value to check.
   * @returns True if the value is an array, otherwise false.
   */
  isArray(value: any): boolean {
    return Array.isArray(value);
  }

  /**
   * Sets meta tags for the component.
   */
  private setMetaTags(): void {
    this.titleService.setTitle(this.pageTitle);
    this.metaService.updateTag({ name: 'description', content: this.pageDescription });

    if (isPlatformBrowser(this.platformId)) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = `
        {
          "@context": "http://schema.org",
          "@type": "MusicCollection",
          "itemListElement": [
            ${this.getStructuredData()}
          ]
        }
      `;
      document.head.appendChild(script);
    }
  }

  /**
   * Generates structured data for the song list.
   * @returns Structured data as a string.
   */
  private getStructuredData(): string {
    let structuredData = '';

    this.songs$.pipe(take(1)).subscribe(songs => {
      structuredData = songs.map((song, index) => `
        {
          "@type": "MusicRecording",
          "name": "${song.title}",
          "url": "/songs/${song.id}",
          "image": "${song.poster}",
          "genre": "${Array.isArray(song.genre) ? song.genre.join(', ') : song.genre}"
        }${index < songs.length - 1 ? ',' : ''}
      `).join('');
    });

    return structuredData;
  }

  /**
   * Checks if all images are loaded.
   */
  public checkImagesLoaded(): void {
    this.songs$.pipe(take(1)).subscribe(songs => {
      const totalImages = songs.length;
      let loadedImages = 0;

      songs.forEach(song => {
        const img = new Image();
        img.src = song.poster;
        img.onload = () => {
          loadedImages++;
          if (loadedImages === totalImages) {
            this.imagesLoaded$.next(true);
          }
        };
        img.onerror = () => {
          loadedImages++;
          if (loadedImages === totalImages) {
            this.imagesLoaded$.next(true);
          }
        };
      });
    });
  }
}
