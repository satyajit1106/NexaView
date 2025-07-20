import { Component } from '@angular/core';
import { InvtableService } from '../../../services/invtable.service';
import { TableComponent } from '../../table/table.component';

@Component({
  selector: 'app-high-demand',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './high-demand.component.html',
  styleUrl: './high-demand.component.scss',
})
export class HighDemandComponent {
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
    'action',
  ];

  constructor(private invTableService: InvtableService) {}

  ngOnInit() {
    this.datasource = this.invTableService.fetchData().map((item: any) => {
      return { ...item, action: 'edit' };
    });
  }
}
