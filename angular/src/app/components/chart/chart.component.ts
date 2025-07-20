import {
  Component,
  ElementRef,
  Input,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
})
export class ChartComponent {
  @ViewChild('chartCanvas', { static: true })
  chartRef!: ElementRef<HTMLCanvasElement>;

  @Input() orders: {
    date: string;
    numOfActiveOrders: number;
    numOfInactiveOrders: number;
  }[] = [];

  private chart!: Chart;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['orders'] && this.orders.length > 0) {
      this.renderChart();
    }
  }

  private renderChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }

    const ctx = this.chartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    const labels = this.orders.map((order) =>
      new Date(order.date).toLocaleDateString()
    );
    const activeOrders = this.orders.map((order) => order.numOfActiveOrders);
    const inactiveOrders = this.orders.map(
      (order) => order.numOfInactiveOrders
    );

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Active Orders',
            data: activeOrders,
            backgroundColor: 'rgba(255, 255, 255, 1)',
            borderColor: '#5493DB',
            borderWidth: 2,
            type: 'line',
          },
          {
            label: 'Inactive Orders',
            data: inactiveOrders,
            backgroundColor: 'rgba(30, 30, 145, 1)',
            borderColor: 'rgba(255, 255, 255, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit() {}
}
