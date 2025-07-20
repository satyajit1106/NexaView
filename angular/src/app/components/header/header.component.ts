import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIcon, RouterOutlet, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input() isOpen = true;

  isProfileVisible = false;

  toggleProfile() {
    this.isProfileVisible = !this.isProfileVisible;
  }
}
