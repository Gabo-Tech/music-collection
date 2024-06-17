import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NavbarService } from 'src/app/services/navbar.service';
import { Meta, Title } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let navbarServiceStub: Partial<NavbarService>;
  let metaService: Meta;
  let titleService: Title;

  beforeEach(async () => {
    navbarServiceStub = {
      title$: of('Test Title'),
    };

    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [RouterTestingModule, TranslateModule.forRoot()],
      providers: [
        { provide: NavbarService, useValue: navbarServiceStub },
        Meta,
        Title,
        TranslateService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    metaService = TestBed.inject(Meta);
    titleService = TestBed.inject(Title);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle menu', () => {
    expect(component.menuOpen).toBe(false);
    component.toggleMenu();
    expect(component.menuOpen).toBe(true);
    component.toggleMenu();
    expect(component.menuOpen).toBe(false);
  });

  it('should set the page title and meta description', () => {
    component.ngOnInit();
    fixture.detectChanges();

    component.pageTitle$.subscribe((title) => {
      expect(title).toBe('Test Title');
      expect(titleService.getTitle()).toBe('Test Title');
      const metaTag = metaService.getTag('name="description"');
      expect(metaTag?.content).toBe('Current page: Test Title');
    });
  });

  it('should render the navbar elements', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.navbar__toggle-button')).toBeTruthy();
    expect(compiled.querySelector('.navbar__title')).toBeTruthy();
    expect(compiled.querySelectorAll('.navbar__links a').length).toBe(3);
  });
});
