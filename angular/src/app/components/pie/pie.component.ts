import { Component, Input } from '@angular/core';
import HighCharts from 'highcharts';

@Component({
  selector: 'app-pie',
  standalone: true,
  imports: [],
  templateUrl: './pie.component.html',
  styleUrl: './pie.component.scss',
})
export class PieComponent {
  HighCharts = HighCharts;
  chartOptions: HighCharts.Options = {};

  // variables with data to be displayed
  @Input() metrics: any[] = [];
  @Input() onlineTotal: number = 0;

  ngAfterViewInit(): void {
    this.renderChart();
  }

  renderChart() {
    const total = this.onlineTotal;

    this.chartOptions = {
      chart: {
        type: 'pie',
        events: {
          load: function () {
            var chart = this;
            chart.renderer
              .text(
                total.toString(),
                chart.plotLeft + chart.plotWidth / 2 - 10,
                chart.plotTop + chart.plotHeight / 2
              )
              .css({
                fontSize: '16px',
                fontWeight: '900',
              })
              .add();
          },
        },
      },
      title: {
        text: '',
      },
      tooltip: {
        pointFormat: '{point.percentage:.1f}%',
      },
      plotOptions: {
        pie: {
          innerSize: '60%',
          dataLabels: {
            enabled: true,
            format: '{point.percentage:.1f}%',
            distance: -30,
          },
          allowPointSelect: true,
          cursor: 'pointer',
          showInLegend: true,
        },
      },
      series: [
        {
          type: 'pie',
          name: 'Types',
          data: this.metrics,
        },
      ],
      credits: {
        enabled: false,
      },
      colors: ['#3F76B5', '#5493DB', '#7E8BDD', '#C5CAE9'],
    };

    HighCharts.chart('pieContainer', this.chartOptions);
  }
}
