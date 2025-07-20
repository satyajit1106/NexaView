import { Injectable } from '@angular/core';
import { stockInventoryList } from '../../assets/json/inventory.json';

@Injectable({
  providedIn: 'root',
})
export class InvtableService {
  fetchData() {
    return stockInventoryList;
  }
}
