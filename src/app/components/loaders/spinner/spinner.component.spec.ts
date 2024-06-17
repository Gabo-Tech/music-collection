import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpinnerComponent } from './spinner.component';

describe('SpinnerComponent', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpinnerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render spinner loader', () => {
    const compiled = fixture.nativeElement;
    const spinnerLoader = compiled.querySelector('.spinner-border');
    expect(spinnerLoader).toBeTruthy();
  });

  it('should have accessibility attributes on container', () => {
    const compiled = fixture.nativeElement;
    const spinnerContainer = compiled.querySelector('.flex');
    expect(spinnerContainer.getAttribute('aria-label')).toBe('Loading');
    expect(spinnerContainer.getAttribute('role')).toBe('alert');
    expect(spinnerContainer.getAttribute('aria-live')).toBe('assertive');
  });

  it('should have correct classes for spinner styling', () => {
    const compiled = fixture.nativeElement;
    const spinnerElement = compiled.querySelector('.spinner-border');
    expect(spinnerElement.classList).toContain('animate-spin');
    expect(spinnerElement.classList).toContain('inline-block');
    expect(spinnerElement.classList).toContain('w-8');
    expect(spinnerElement.classList).toContain('h-8');
    expect(spinnerElement.classList).toContain('border-4');
    expect(spinnerElement.classList).toContain('rounded-full');
  });

  it('should have role="status" on spinner element', () => {
    const compiled = fixture.nativeElement;
    const spinnerElement = compiled.querySelector('.spinner-border');
    expect(spinnerElement.getAttribute('role')).toBe('status');
  });
});
