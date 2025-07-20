import { Injectable } from '@angular/core';
import { stockInventorySummary } from '../../assets/json/summary.json';

@Injectable({
  providedIn: 'root',
})
export class SummaryService {
  fetchData() {
    return stockInventorySummary;
  }
}
