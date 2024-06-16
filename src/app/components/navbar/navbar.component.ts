import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { NavbarService } from 'src/app/services/navbar.service';
import { Meta, Title } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit {
  menuOpen = false;
  pageTitle$: Observable<string> = of('');

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService,
    private navbarService: NavbarService,
    private metaService: Meta,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.pageTitle$ = this.navbarService.title$.pipe(
      map(title => title || ''),
      mergeMap(title => {
        if (title) {
          return of(title);
        } else {
          return this.router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            map(() => this.activatedRoute),
            map(route => {
              while (route.firstChild) route = route.firstChild;
              return route;
            }),
            mergeMap(route => route.data),
            mergeMap(data => this.translate.get(data['title']))
          );
        }
      })
    );

    this.pageTitle$.subscribe(title => {
      this.titleService.setTitle(title);
      this.metaService.updateTag({ name: 'description', content: `Current page: ${title}` });
    });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
