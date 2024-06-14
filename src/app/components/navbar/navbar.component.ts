import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  menuOpen = false;
  pageTitle = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService,
    private navbarService: NavbarService // Add this
  ) {}

  ngOnInit(): void {
    this.navbarService.title$.subscribe((title) => {
      if (title) {
        this.pageTitle = title;
      } else {
        this.router.events
          .pipe(
            filter((event) => event instanceof NavigationEnd),
            map(() => this.activatedRoute),
            map((route) => {
              while (route.firstChild) route = route.firstChild;
              return route;
            }),
            mergeMap((route) => route.data)
          )
          .subscribe((data) => {
            if (data['title']) {
              this.translate.get(data['title']).subscribe((translatedTitle) => {
                this.pageTitle = translatedTitle;
              });
            }
          });
      }
    });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
