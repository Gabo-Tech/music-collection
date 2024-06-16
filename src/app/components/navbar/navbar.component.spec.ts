import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NavbarService } from 'src/app/services/navbar.service';
import { Meta, Title } from '@angular/platform-browser';
import { of } from 'rxjs';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let routerMock: any;
  let activatedRouteMock: any;
  let translateServiceMock: any;
  let navbarServiceMock: any;
  let metaService: Meta;
  let titleService: Title;

  beforeEach(waitForAsync(() => {
    routerMock = {
      events: of(new NavigationEnd(0, '', '')),
      navigate: jasmine.createSpy('navigate')
    };
    activatedRouteMock = { snapshot: { paramMap: { get: jasmine.createSpy('get').and.returnValue('') } } };
    translateServiceMock = { get: jasmine.createSpy('get').and.returnValue(of('Translated Title')) };
    navbarServiceMock = { title$: of('Test Title') };

    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: TranslateService, useValue: translateServiceMock },
        { provide: NavbarService, useValue: navbarServiceMock },
        Meta,
        Title
      ]
    }).compileComponents();

    metaService = TestBed.inject(Meta);
    titleService = TestBed.inject(Title);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with the correct page title', () => {
    component.ngOnInit();
    component.pageTitle$.subscribe(title => {
      expect(title).toBe('Test Title');
    });
  });

  it('should set meta tags on init', () => {
    component.ngOnInit();
    expect(titleService.getTitle()).toBe('Test Title');
    expect(metaService.getTag('name="description"')?.content).toBe('Current page: Test Title');
  });

  it('should toggle menuOpen state when toggleMenu is called', () => {
    component.toggleMenu();
    expect(component.menuOpen).toBeTrue();
    component.toggleMenu();
    expect(component.menuOpen).toBeFalse();
  });
});
