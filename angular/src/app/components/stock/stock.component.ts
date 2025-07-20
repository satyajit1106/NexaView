import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [MatIcon, RouterLink, RouterOutlet],
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.scss',
})
export class StockComponent {
  constructor(private router: Router, private dialog: MatDialog) {}

  isCurrentPath(path: string) {
    return this.router.url === path;
  }

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
}
