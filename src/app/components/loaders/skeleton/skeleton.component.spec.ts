import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkeletonComponent } from './skeleton.component';

describe('SkeletonComponent', () => {
  let component: SkeletonComponent;
  let fixture: ComponentFixture<SkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SkeletonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render skeleton loaders', () => {
    const compiled = fixture.nativeElement;
    const skeletonLoaders = compiled.querySelectorAll(
      '.animate-pulse .bg-gray-300'
    );
    expect(skeletonLoaders.length).toBe(3);
  });

  it('should have accessibility attributes', () => {
    const compiled = fixture.nativeElement;
    const skeletonContainer = compiled.querySelector('.animate-pulse');
    expect(skeletonContainer.getAttribute('aria-label')).toBe(
      'Loading content'
    );
    expect(skeletonContainer.getAttribute('role')).toBe('alert');
    expect(skeletonContainer.getAttribute('aria-live')).toBe('polite');
  });

  it('should have the correct classes for styling', () => {
    const compiled = fixture.nativeElement;
    const skeletonElements = compiled.querySelectorAll(
      '.animate-pulse .bg-gray-300'
    );

    expect(skeletonElements[0].classList).toContain('h-4');
    expect(skeletonElements[0].classList).toContain('bg-gray-300');
    expect(skeletonElements[0].classList).toContain('rounded');
    expect(skeletonElements[0].classList).toContain('w-3/4');

    expect(skeletonElements[1].classList).toContain('h-4');
    expect(skeletonElements[1].classList).toContain('bg-gray-300');
    expect(skeletonElements[1].classList).toContain('rounded');

    expect(skeletonElements[2].classList).toContain('h-4');
    expect(skeletonElements[2].classList).toContain('bg-gray-300');
    expect(skeletonElements[2].classList).toContain('rounded');
    expect(skeletonElements[2].classList).toContain('w-5/6');
  });
});
