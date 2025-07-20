import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { ChartComponent } from '../chart/chart.component';
import { StockInvService } from '../../services/stock-inv.service';
import { ReactiveFormsModule } from '@angular/forms';
import { PieComponent } from '../pie/pie.component';
import { PieService } from '../../services/pie.service';
import { PiechartComponent } from '../piechart/piechart.component';
import { ShipmentComponent } from '../shipment/shipment.component';
import { RouterLink } from '@angular/router';
import { BlogService } from '../../services/blog.service';

interface Metric {
  name: string;
  y: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ChartComponent,
    ReactiveFormsModule,
    PieComponent,
    PiechartComponent,
    ShipmentComponent,
    RouterLink,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  currentView: string = 'Online';

  toggleView() {
    this.currentView = this.currentView === 'Online' ? 'Offline' : 'Online';
  }

  formattedDate(date: string) {
    return new Date(date).toISOString().split('T')[0];
  }

  blogService = inject(BlogService);
  changeDetectorRef = inject(ChangeDetectorRef);

  asideBlogs: any[] = this.blogService.fetchLatest();

  orders: any = [];
  filteredOrders: any = [];

  _selectedFilter: string = 'lastWeek';
  _pieFilter: string = 'lastWeek';

  constructor(
    private inventoryService: StockInvService,
    private pieService: PieService
  ) {}

  setSelectedFilter(event: any) {
    this._selectedFilter = event.target.value;
    this.applyFilter();
  }

  setPieFilter(event: any) {
    // filter for pie chart
    this._pieFilter = event.target.value;
    this.filterPie();
  }

  filterPie() {
    const now = new Date();
    let startDate: Date;

    switch (this._pieFilter) {
      case 'lastWeek':
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 7);
        break;
      case 'lastMonth':
        startDate = new Date(now);
        startDate.setMonth(now.getMonth() - 1);
        break;
      case 'last6Months':
        startDate = new Date(now);
        startDate.setMonth(now.getMonth() - 6);
        break;
      case 'lastYear':
        startDate = new Date(now);
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        startDate = new Date(0);
    }

    const onlineData = this.data.filter((item) => item.connection === 'Online');
    const offlineData = this.data.filter(
      (item) => item.connection === 'Offline'
    );

    const filteredOnlineData = onlineData.filter((item) => {
      const itemDate = new Date(item.deliveryDate);
      return itemDate >= startDate && itemDate <= now;
    });

    const filteredOfflineData = offlineData.filter((item) => {
      const itemDate = new Date(item.deliveryDate);
      return itemDate >= startDate && itemDate <= now;
    });

    const onlineMetrics: Metric[] = [
      {
        name: 'Cash Management',
        y: filteredOnlineData.filter((item) => item.task === 'Cash Management')
          .length,
      },
      {
        name: 'Financial Reporting',
        y: filteredOnlineData.filter(
          (item) => item.task === 'Financial Reporting'
        ).length,
      },
      {
        name: 'Vendors & Contracts',
        y: filteredOnlineData.filter(
          (item) => item.task === 'Vendors & Contracts'
        ).length,
      },
      {
        name: 'Advertising',
        y: filteredOnlineData.filter((item) => item.task === 'Advertising')
          .length,
      },
    ];

    const offlineMetrics: Metric[] = [
      {
        name: 'Cash Management',
        y: filteredOfflineData.filter((item) => item.task === 'Cash Management')
          .length,
      },
      {
        name: 'Financial Reporting',
        y: filteredOfflineData.filter(
          (item) => item.task === 'Financial Reporting'
        ).length,
      },
      {
        name: 'Vendors & Contracts',
        y: filteredOfflineData.filter(
          (item) => item.task === 'Vendors & Contracts'
        ).length,
      },
      {
        name: 'Advertising',
        y: filteredOfflineData.filter((item) => item.task === 'Advertising')
          .length,
      },
    ];

    this.onlineTotal = onlineMetrics.reduce((acc, item) => acc + item.y, 0);
    this.offlineTotal = offlineMetrics.reduce((acc, item) => acc + item.y, 0);

    this.metrics = onlineMetrics;
    this.offlineMetrics = offlineMetrics;

    console.log(onlineMetrics, this.onlineTotal);

    this.changeDetectorRef.detectChanges();
  }

  applyFilter() {
    const now = new Date();
    let filteredData = this.orders.filter((order: any) => {
      const orderDate = new Date(order.date);

      switch (this._selectedFilter) {
        case 'lastWeek': {
          const startDate = new Date(now);
          startDate.setDate(now.getDate() - 7);
          return orderDate >= startDate && orderDate <= now;
        }
        case 'lastMonth': {
          const startDate = new Date(now);
          startDate.setMonth(now.getMonth() - 1);
          return orderDate >= startDate && orderDate <= now;
        }
        case 'last6Months': {
          const startDate = new Date(now);
          startDate.setMonth(now.getMonth() - 6);
          return orderDate >= startDate && orderDate <= now;
        }
        case 'lastYear': {
          const startDate = new Date(now);
          startDate.setFullYear(now.getFullYear() - 1);
          return orderDate >= startDate && orderDate <= now;
        }
        default:
          return true;
      }
    });

    this.filteredOrders = filteredData;
  }

  // Online Pie Chart Config

  data: any[] = [];
  onlineData: any[] = [];
  offlineData: any[] = [];

  metrics: Metric[] = [];
  onlineTotal: number = 0;

  offlineMetrics: Metric[] = [];
  offlineTotal: number = 0;

  shipmentMetrics: Metric[] = [];
  shipmentTotal: number = 0;

  ngOnInit() {
    this.orders = this.inventoryService.fetchData();
    this.applyFilter();

    this.data = this.pieService.fetchData();
    this.onlineData = this.data.filter((item) => item.connection === 'Online');
    this.offlineData = this.data.filter(
      (item) => item.connection === 'Offline'
    );

    const cashManagementCount = this.onlineData.filter(
      (item) => item.task === 'Cash Management'
    ).length;
    const financialReportingCount = this.onlineData.filter(
      (item) => item.task === 'Financial Reporting'
    ).length;
    const vendorsCount = this.onlineData.filter(
      (item) => item.task === 'Vendors & Contracts'
    ).length;
    const advertisingCount = this.onlineData.filter(
      (item) => item.task === 'Advertising'
    ).length;

    const offlineCashManagementCount = this.offlineData.filter(
      (item) => item.task === 'Cash Management'
    ).length;
    const offlineFinancialReportingCount = this.offlineData.filter(
      (item) => item.task === 'Financial Reporting'
    ).length;
    const offlineVendorsCount = this.offlineData.filter(
      (item) => item.task === 'Vendors & Contracts'
    ).length;
    const offlineAdvertisingCount = this.offlineData.filter(
      (item) => item.task === 'Advertising'
    ).length;

    const metrics: Metric[] = [
      {
        name: 'Cash Management',
        y: cashManagementCount,
      },
      {
        name: 'Financial Reporting',
        y: financialReportingCount,
      },
      {
        name: 'Vendors & Contracts',
        y: vendorsCount,
      },
      {
        name: 'Advertising',
        y: advertisingCount,
      },
    ];
    const onlineTotal = metrics.reduce((acc, item) => acc + item.y, 0);

    const offlineMetrics: Metric[] = [
      {
        name: 'Cash Management',
        y: offlineCashManagementCount,
      },
      {
        name: 'Financial Reporting',
        y: offlineFinancialReportingCount,
      },
      {
        name: 'Vendors & Contracts',
        y: offlineVendorsCount,
      },
      {
        name: 'Advertising',
        y: offlineAdvertisingCount,
      },
    ];
    const offlineTotal = offlineMetrics.reduce((acc, item) => acc + item.y, 0);

    this.metrics = metrics;
    this.onlineTotal = onlineTotal;

    this.offlineMetrics = offlineMetrics;
    this.offlineTotal = offlineTotal;

    // Shipment Statistics

    const completedOrders = this.data.filter(
      (item) => item.status === 'completed'
    ).length;
    const transitOrders = this.data.filter(
      (item) => item.status === 'in-transit'
    ).length;
    const failedOrders = this.data.filter(
      (item) => item.status === 'failed'
    ).length;
    const pendingOrders = this.data.filter(
      (item) => item.status === 'pending'
    ).length;

    const shipmentTotal = this.data.length;

    const shipmentMetrics = [
      {
        name: 'Completed',
        y: completedOrders,
      },
      {
        name: 'In-Transit',
        y: transitOrders,
      },
      {
        name: 'Failed',
        y: failedOrders,
      },
      {
        name: 'Pending',
        y: pendingOrders,
      },
    ];

    this.shipmentMetrics = shipmentMetrics;
    this.shipmentTotal = shipmentTotal;
  }
}
