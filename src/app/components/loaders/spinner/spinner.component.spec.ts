import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpinnerComponent } from './spinner.component';

describe('SpinnerComponent', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpinnerComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have proper ARIA attributes', () => {
    const spinnerElement: HTMLElement = fixture.nativeElement.querySelector('div[role="alert"]');
    expect(spinnerElement.getAttribute('aria-label')).toBe('Loading');
    expect(spinnerElement.getAttribute('aria-live')).toBe('assertive');
  });

  it('should render spinner element', () => {
    const spinnerElement: HTMLElement = fixture.nativeElement.querySelector('.spinner-border');
    expect(spinnerElement).toBeTruthy();
    expect(spinnerElement.classList).toContain('animate-spin');
  });
});
