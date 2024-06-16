import { Component, Input, OnInit, OnChanges, SimpleChanges, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit, OnChanges {
  @Input() progress: number = 0;
  @Input() duration: number = 1000;
  currentProgress: number = 0;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    this.animateProgress();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['progress'] && !changes['progress'].isFirstChange()) {
      this.animateProgress();
    }
  }

  private animateProgress(): void {
    const start = this.currentProgress;
    const end = this.progress;
    const duration = this.duration;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min((elapsedTime / duration) * (end - start) + start, end);
      this.currentProgress = progress;
      this.renderer.setStyle(this.el.nativeElement.querySelector('.progress-bar-inner'), 'width', `${progress}%`);

      if (progress < end) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }
}
