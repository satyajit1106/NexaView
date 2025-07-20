import { Component } from '@angular/core';
import { MapComponent } from '../map.component';

@Component({
  selector: 'app-mapview',
  standalone: true,
  imports: [MapComponent],
  templateUrl: './mapview.component.html',
  styleUrl: './mapview.component.scss',
})
export class MapviewComponent {
  mapLocations = [
    {
      lat: 12.92725,
      lng: 77.6858317,
    },
    {
      lat: 13.3828793,
      lng: 77.5951943,
    },
    {
      lat: 12.9207558,
      lng: 77.6811132,
    },
    {
      lat: 12.9258688,
      lng: 77.6727406,
    },
    {
      lat: 12.9498069,
      lng: 77.6629473,
    },
  ];
}
