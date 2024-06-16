import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkeletonComponent } from './skeleton.component';

describe('SkeletonComponent', () => {
  let component: SkeletonComponent;
  let fixture: ComponentFixture<SkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SkeletonComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have proper ARIA attributes', () => {
    const skeletonElement: HTMLElement = fixture.nativeElement.querySelector('div[role="alert"]');
    expect(skeletonElement.getAttribute('aria-label')).toBe('Loading content');
    expect(skeletonElement.getAttribute('aria-live')).toBe('polite');
  });

  it('should render skeleton loader elements', () => {
    const skeletonElements: NodeList = fixture.nativeElement.querySelectorAll('.bg-gray-300');
    expect(skeletonElements.length).toBe(3);
  });
});
