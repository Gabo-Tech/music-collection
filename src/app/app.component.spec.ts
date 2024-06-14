import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { AppComponent } from './app.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  template: '',
})
class MockNavbarComponent {}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let translateService: TranslateService;

  beforeEach(async () => {
    const translateServiceStub = {
      setDefaultLang: jest.fn(),
      use: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [AppComponent, MockNavbarComponent],
      providers: [
        { provide: TranslateService, useValue: translateServiceStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    translateService = TestBed.inject(TranslateService);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'music-collection'`, () => {
    expect(component.title).toEqual('music-collection');
  });

  it('should set default language to Spanish', () => {
    expect(translateService.setDefaultLang).toHaveBeenCalledWith('es');
    expect(translateService.use).toHaveBeenCalledWith('es');
  });

  it('should render navbar and router outlet', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-navbar')).toBeTruthy();
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });
});
