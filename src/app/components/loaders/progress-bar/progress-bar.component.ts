import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent implements OnInit, OnChanges {
  @Input() progress: number = 0;
  @Input() duration: number = 1000;
  currentProgress: number = 0;

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
      const progress = Math.min(
        (elapsedTime / duration) * (end - start) + start,
        end
      );
      this.currentProgress = progress;

      if (progress < end) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }
}
