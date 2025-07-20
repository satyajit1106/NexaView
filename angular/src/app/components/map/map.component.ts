import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent {
  @Input() locations: { lat: number; lng: number }[] = [];

  private map: any;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      import('leaflet').then((L) => {
        this.initMap(L);
      });
    }
  }

  private initMap(L: any): void {
    if (!this.locations || this.locations.length === 0) {
      console.log(`No locations provided`);
      return;
    }

    this.map = L.map('map').setView(
      [this.locations[0].lat, this.locations[0].lng],
      13
    ); // Note to self: Here 13 is the zoom level

    if (!this.map) {
      console.log('Failed to initialize provided map.');
      return;
    }

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(
      this.map
    );

    const customIcon = L.icon({
      iconUrl: 'assets/images/marker-icon.png',
      shadowUrl: 'assets/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    });

    this.locations.forEach((location) => {
      if (this.map) {
        L.marker([location.lat, location.lng], { icon: customIcon }).addTo(
          this.map
        );
      }
    });
  }
}
