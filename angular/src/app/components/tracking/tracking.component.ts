import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { TrackingService } from '../../services/tracking.service';
import { Table2Component } from '../table2/table2.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-tracking',
  standalone: true,
  imports: [MatIcon, Table2Component],
  templateUrl: './tracking.component.html',
  styleUrl: './tracking.component.scss',
})
export class TrackingComponent {
  datasource: any[] = [];
  displayedColumns: any[] = [];

  filteredData: any = [];

  trackingService = inject(TrackingService);

  selectedFilter: string = 'all';

  constructor(private dialog: MatDialog) {}

  openModal() {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
      }
    });
  }

  isCurrent(filter: string) {
    return this.selectedFilter === filter;
  }

  applyFilter(status: string) {
    this.selectedFilter = status;
    if (status === 'all') {
      this.filteredData = this.datasource;
    } else {
      this.filteredData = this.datasource.filter(
        (item) => item.status.toLowerCase() === status.toLowerCase()
      );
    }
  }

  ngOnInit() {
    this.datasource = this.trackingService.fetchData();
    this.filteredData = this.datasource;
    this.displayedColumns = [
      'id',
      'shipperName',
      'phoneNo.',
      'status',
      'product',
      'supplier',
      'quantity',
      'price',
      'deliveryDate',
      'consignee',
      'destination',
      'connection',
      'task',
    ];
  }
}
