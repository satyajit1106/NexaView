import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})
export class CarouselComponent {
  @Input() images: string[] = [];

  currentIndex = 0;
  interval: any;

  ngOnInit() {
    this.startAutoSlide();
  }

  startAutoSlide() {
    this.interval = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 3000);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  goToSlide(index: number) {
    this.currentIndex = index;
    clearInterval(this.interval);
    this.startAutoSlide();
  }
}
