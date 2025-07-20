import { Injectable } from '@angular/core';
import { shipmentsList } from '../../assets/json/pieData.json';

@Injectable({
  providedIn: 'root',
})
export class PieService {
  fetchData() {
    return shipmentsList;
  }
}
