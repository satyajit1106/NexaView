import { Injectable } from '@angular/core';
import { stockInventoryAnalysisChartData } from '../../assets/json/stockInventory.json';

@Injectable({
  providedIn: 'root',
})
export class StockInvService {
  fetchData() {
    return stockInventoryAnalysisChartData;
  }
}
