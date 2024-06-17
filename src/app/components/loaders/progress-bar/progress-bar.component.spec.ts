import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgressBarComponent } from './progress-bar.component';
import { Renderer2, ElementRef } from '@angular/core';

describe('ProgressBarComponent', () => {
  let component: ProgressBarComponent;
  let fixture: ComponentFixture<ProgressBarComponent>;
  let mockRenderer: Renderer2;
  let mockElementRef: ElementRef;

  beforeEach(async () => {
    mockRenderer = jasmine.createSpyObj('Renderer2', ['setStyle']);
    mockElementRef = new ElementRef(document.createElement('div'));

    await TestBed.configureTestingModule({
      declarations: [ProgressBarComponent],
      providers: [
        { provide: Renderer2, useValue: mockRenderer },
        { provide: ElementRef, useValue: mockElementRef },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set initial progress to 0', () => {
    expect(component.currentProgress).toBe(0);
  });

  it('should update progress when input changes', (done) => {
    component.progress = 50;
    component.ngOnChanges({
      progress: {
        currentValue: 50,
        previousValue: 0,
        firstChange: false,
        isFirstChange: () => false,
      },
    });
    fixture.detectChanges();

    setTimeout(() => {
      expect(component.currentProgress).toBe(50);
      done();
    }, component.duration + 50);
  });

  it('should animate progress', (done) => {
    component.progress = 100;
    component.duration = 100;
    component.ngOnChanges({
      progress: {
        currentValue: 100,
        previousValue: 0,
        firstChange: false,
        isFirstChange: () => false,
      },
    });
    fixture.detectChanges();

    setTimeout(() => {
      expect(component.currentProgress).toBe(100);
      done();
    }, 150);
  });

  it('should render progress bar with correct width', () => {
    component.currentProgress = 75;
    fixture.detectChanges();

    const progressBarInner = fixture.nativeElement.querySelector(
      '.progress-bar-inner'
    );
    expect(progressBarInner.style.width).toBe('75%');
  });
});
