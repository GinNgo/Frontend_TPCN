import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
@Component({
  selector: 'app-widget-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() label!: string;
  // @Input() total!: string;
  @Input() unit!: string;
  @Input() total!: number;
  // @Input() percentage!: string;
  m = false;

  Highcharts = Highcharts;
  chartOptions = {};
  constructor() {}
  k = false;
  ngOnInit(): void {
    // if (this.getTotal >= 1000000) {
    //   this.m = true;
    //   this.total = (this.getTotal / 1000000.0).toString();

    // }

    this.chartOptions = {
      chart: {
        type: 'area',
        backgroundColor: null,
        borderWidth: 0,
        margin: [2, 2, 2, 2],
        height: 80,
      },
      title: {
        text: null,
      },
      subtitle: {
        text: null,
      },
      tooltip: {
        split: true,
        outside: true,
      },
      legend: {
        enabled: false,
      },
      credits: {
        enabled: false,
      },
      exporting: {
        enabled: false,
      },
      xAxis: {
        labels: {
          enabled: false,
        },
        title: {
          text: null,
        },
        startOnTick: false,
        endOnTick: false,
        tickOptions: [],
      },
      yAxis: {
        labels: {
          enabled: false,
        },
        title: {
          text: null,
        },
        startOnTick: false,
        endOnTick: false,
        tickOptions: [],
      },
      series: [
        {
          data: [20, 60, 45, 71],
        },
      ],
    };
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);
  }
}
