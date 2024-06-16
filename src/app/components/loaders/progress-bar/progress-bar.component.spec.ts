import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ProgressBarComponent } from './progress-bar.component';
import { Renderer2 } from '@angular/core';

describe('ProgressBarComponent', () => {
  let component: ProgressBarComponent;
  let fixture: ComponentFixture<ProgressBarComponent>;
  let renderer2: Renderer2;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProgressBarComponent],
      providers: [Renderer2]
    }).compileComponents();

    renderer2 = TestBed.inject(Renderer2);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set initial progress to 0', () => {
    expect(component.progress).toBe(0);
  });

  it('should update progress bar width on progress change', () => {
    component.progress = 50;
    component.ngOnChanges({
      progress: {
        currentValue: 50,
        previousValue: 0,
        firstChange: false,
        isFirstChange: () => false
      }
    });

    fixture.detectChanges();

    const progressBarInner: HTMLElement = fixture.nativeElement.querySelector('.progress-bar-inner');
    expect(progressBarInner.style.width).toBe('50%');
  });

  it('should animate progress bar', (done) => {
    component.progress = 100;
    component.duration = 1000;
    component.ngOnChanges({
      progress: {
        currentValue: 100,
        previousValue: 0,
        firstChange: false,
        isFirstChange: () => false
      }
    });

    fixture.detectChanges();

    setTimeout(() => {
      const progressBarInner: HTMLElement = fixture.nativeElement.querySelector('.progress-bar-inner');
      expect(progressBarInner.style.width).toBe('100%');
      done();
    }, 1000);
  });
});
