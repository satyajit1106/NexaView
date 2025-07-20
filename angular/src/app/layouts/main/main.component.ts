import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
} from '@angular/material/sidenav';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    SidebarComponent,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    HeaderComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  isOpen = true;

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }
}
