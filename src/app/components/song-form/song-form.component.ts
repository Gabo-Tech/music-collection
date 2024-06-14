import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SongService } from 'src/app/services/song.service';

@Component({
  selector: 'app-song-form',
  templateUrl: './song-form.component.html',
  styleUrls: ['./song-form.component.scss'],
})
export class SongFormComponent implements OnInit {
  songForm: FormGroup;
  isEdit = false;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private songService: SongService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.songForm = this.fb.group({
      title: [''],
      genre: [''],
      year: [''],
      duration: [''],
      rating: [''],
      artist: [''],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.isEdit = true;
      this.songService.getSong(+id).subscribe((data) => {
        this.songForm.patchValue(data);
        this.loading = false;
      });
    } else {
      this.loading = false;
    }
  }

  onSubmit(): void {
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
}
