import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SongService } from 'src/app/services/song.service';

@Component({
  selector: 'app-song-form',
  templateUrl: './song-form.component.html',
  styleUrls: ['./song-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SongFormComponent implements OnInit {
  songForm: FormGroup;
  isEdit = false;
  loading = true;
  pageTitle: string = 'Add New Song';
  currentYear: number = new Date().getFullYear();
  loaderType: string = '';
  progress: number = 0;

  constructor(
    private fb: FormBuilder,
    private songService: SongService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.songForm = this.fb.group({
      title: ['', Validators.required],
      genre: ['', Validators.required],
      year: [
        '',
        [
          Validators.required,
          Validators.min(1900),
          Validators.max(this.currentYear),
        ],
      ],
      duration: ['', Validators.required],
      rating: ['', [Validators.required, Validators.min(0), Validators.max(5)]],
      artist: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.selectRandomLoader();
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.isEdit = true;
      this.pageTitle = 'Edit Song';
      this.songService.getSong(+id).subscribe((data) => {
        this.songForm.patchValue(data);
        this.loading = false;
      });
    } else {
      this.loading = false;
    }
    this.initializeProgress();
  }

  onSubmit(): void {
    if (this.songForm.invalid) {
      return;
    }

    const id = this.route.snapshot.paramMap.get('id');
    if (this.isEdit && id !== null) {
      this.songService.updateSong(+id, this.songForm.value).subscribe(() => {
        this.router.navigate(['/songs']);
      });
    } else {
      this.songService.addSong(this.songForm.value).subscribe(() => {
        this.router.navigate(['/songs']);
      });
    }
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
}
