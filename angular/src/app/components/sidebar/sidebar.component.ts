import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatIcon, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @Input() isOpen = true;
  @Output() toggle = new EventEmitter<void>();

  sideLinks = [
    { id: 1, href: 'dashboard', icon: 'dashboard', content: 'Dashboard' },
    { id: 2, href: 'stocks', icon: 'area_chart', content: 'Stocks Management' },
    {
      id: 3,
      href: 'tracking',
      icon: 'pie_chart_outline',
      content: 'Shipment Tracking',
    },
    {
      id: 4,
      href: 'reports',
      icon: 'sticky_note_2',
      content: 'Reports & Analytics',
    },
    {
      id: 5,
      href: 'customer-management',
      icon: 'people',
      content: 'Customer Management',
    },
    { id: 6, href: 'blogs', icon: 'newspaper', content: 'Food Safety Blogs' },
  ];

  bottomLinks = [
    { id: 1, icon: 'settings', content: 'Settings' },
    { id: 2, icon: 'person', content: 'My Account' },
    { id: 3, icon: 'support', content: 'Help & Support' },
  ];

  constructor(private router: Router) {}

  toggleSidebar() {
    this.toggle.emit();
  }

  navigateToLink(id: number) {
    this.router.navigate([
      this.sideLinks[id - 1].content.toLowerCase().replaceAll(' ', '-'),
    ]);
  }

  isCurrentPage(route: string) {
    return this.router.url === '/' + route.toLowerCase().replaceAll(' ', '-');
  }
}
