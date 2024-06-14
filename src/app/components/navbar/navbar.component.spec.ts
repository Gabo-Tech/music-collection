import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NavbarService } from '../../services/navbar.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let mockRouter: any;
  let mockActivatedRoute: any;
  let mockTranslateService: any;
  let mockNavbarService: any;

  beforeEach(async () => {
    mockRouter = {
      events: of(new NavigationEnd(0, '/', '/')),
      navigate: jest.fn(),
    };

    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: jest.fn(),
        },
      },
      firstChild: null,
    };

    mockTranslateService = {
      get: jest.fn((key) => of(key)),
    };

    mockNavbarService = {
      title$: of('Mock Title'),
    };

    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [RouterTestingModule, TranslateModule.forRoot()],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: TranslateService, useValue: mockTranslateService },
        { provide: NavbarService, useValue: mockNavbarService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle menuOpen property when toggleMenu is called', () => {
    component.toggleMenu();
    expect(component.menuOpen).toBe(true);
    component.toggleMenu();
    expect(component.menuOpen).toBe(false);
  });

  it('should set pageTitle from NavbarService', () => {
    expect(component.pageTitle).toBe('Mock Title');
  });

  it('should display the title in the navbar', () => {
    const titleElement = fixture.debugElement.query(By.css('.navbar__title'));
    expect(titleElement.nativeElement.textContent.trim()).toBe('Mock Title');
  });

  it('should display translated titles for links', () => {
    const links = ['SONGS', 'ARTISTS', 'COMPANIES'];
    mockTranslateService.get.mockImplementation((key: any) => of(key));
    fixture.detectChanges();
    
    const linkElements = fixture.debugElement.queryAll(
      By.css('.navbar__links a')
    );
    expect(linkElements.length).toBe(links.length);
    links.forEach((link, index) => {
      expect(linkElements[index].nativeElement.textContent.trim()).toBe(link);
    });
  });

  it('should close the menu when a sidebar link is clicked', () => {
    component.menuOpen = true;
    fixture.detectChanges();
    const sidebarLink = fixture.debugElement.query(
      By.css('.navbar__sidebar-link')
    );
    sidebarLink.triggerEventHandler('click', null);
    expect(component.menuOpen).toBe(false);
  });

  it('should subscribe to router events and set the pageTitle based on route data', () => {
    mockNavbarService.title$ = of(null);
    const routeData = { title: 'Mock Route Title' };
    mockActivatedRoute.firstChild = {
      snapshot: { data: routeData },
    };

    component.ngOnInit();
    expect(component.pageTitle).toBe('Mock Route Title');
  });
});
