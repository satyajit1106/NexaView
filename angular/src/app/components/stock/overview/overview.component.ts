import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { SummaryService } from '../../../services/summary.service';
import { ChartComponent } from '../../chart/chart.component';
import { StockInvService } from '../../../services/stock-inv.service';
import { TableComponent } from '../../table/table.component';
import { InvtableService } from '../../../services/invtable.service';
import { RouterLink } from '@angular/router';

interface Card {
  id: number;
  icon: string;
  title: string;
  units: number;
  status: number;
}

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [MatIcon, ChartComponent, TableComponent, RouterLink],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
})
export class OverviewComponent {
  cards: Card[] = [];

  orders: any[] = [];
  filteredOrders: any = [];

  datasource: any = [];
  displayedColumns: string[] = [
    'consumerName',
    'product',
    'supplier',
    'dateOfEntry',
    'quantity',
    'price',
    'sellingPrice',
    'cashier',
    'status',
  ];

  _selectedFilter: string = 'lastWeek';

  summaryService = inject(SummaryService);

  constructor(
    private inventoryService: StockInvService,
    private invTableService: InvtableService
  ) {}

  ngOnInit() {
    this.cards = this.summaryService.fetchData();

    this.orders = this.inventoryService.fetchData();

    this.datasource = this.invTableService.fetchData().slice(0, 4);

    this.applyFilter();
  }

  setSelectedFilter(event: any) {
    this._selectedFilter = event.target.value;
    this.applyFilter();
  }

  applyFilter() {
    const now = new Date();
    let filteredData = this.orders.filter((order: any) => {
      const orderDate = new Date(order.date);

      switch (this._selectedFilter) {
        case 'lastWeek':
          return orderDate >= new Date(now.setDate(now.getDate() - 7));
        case 'lastMonth':
          return orderDate >= new Date(now.setMonth(now.getMonth() - 1));
        case 'last6Months':
          return orderDate >= new Date(now.setMonth(now.getMonth() - 6));
        case 'lastYear':
          return orderDate >= new Date(now.setFullYear(now.getFullYear() - 1));
        default:
          return true;
      }
    });

    this.filteredOrders = filteredData;
  }
}
