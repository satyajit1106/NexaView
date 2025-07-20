import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, ViewChild, inject } from '@angular/core';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, MatIcon, MatSortModule, MatPaginatorModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Input() datasource = [];

  @Input() displayedColumns: string[] = [];

  @Input() type: string = 'action';

  private _liveAnnouncer = inject(LiveAnnouncer);

  datasourceFinal = new MatTableDataSource<any>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnChanges() {
    this.datasourceFinal.data = this.datasource;
  }

  ngAfterViewInit() {
    this.datasourceFinal.sort = this.sort;
    this.datasourceFinal.data = this.datasource;
    this.datasourceFinal.paginator = this.paginator;
  }

  formatDate(date: string) {
    return new Date(date).toLocaleDateString();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
