import { Injectable } from '@angular/core';
import { shipmentsList } from '../../assets/json/pieData.json';

@Injectable({
  providedIn: 'root',
})
export class TrackingService {
  fetchData() {
    return shipmentsList;
  }
}
