import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SongService } from 'src/app/services/song.service';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.scss'],
})
export class SongDetailComponent implements OnInit {
  song: any;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private songService: SongService,
    private navbarService: NavbarService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.songService.getSong(+id).subscribe((data) => {
        this.song = data;
        this.loading = false;
        this.navbarService.setTitle(this.song.title);
      });
    }
  }
}
