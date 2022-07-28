import { OrderService } from './../../../services/order.service';
import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
HC_exporting(Highcharts);
export interface DayOrder {
  day: number;
  value: number;
  totalPrice: number;
}
export interface MonthOrder {
  month: number;
  value: number;
  totalPrice: number;
}
@Component({
  selector: 'app-widget-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss'],
})
export class AreaComponent implements OnInit {
  chartOptions: {} = {};
  constructor(private OrderService: OrderService) {}
  dayOrder: DayOrder[] = [];
  monthOrder: MonthOrder[] = [];
  data: any[] = [{}];
  Highcharts = Highcharts;
  ngOnInit(): void {
    this.OrderService.GetOnSeven().subscribe((res) => {
      this.dayOrder = res;
      this.data.pop();
      if (this.dayOrder.length > 0) {
        let i = 0;
        this.dayOrder.forEach((e: DayOrder) => {
          this.data.push(e.value);
          i++;
        });
      }
      this.chartOptions = {
        series: [
          {
            name: 'Số lượng',
            data: this.data,
          },
        ],
      };
    });
    this.chartOptions = {
      chart: {
        type: 'area',
      },
      title: {
        text: 'Số đơn hàng trong tuần',
      },
      subtitle: {
        text: 'Thứ 2 - Chủ nhật',
      },
      tooltip: {
        split: true,
        valueSuffix: ' đơn',
      },
      credits: {
        enabled: false,
      },
      exporting: {
        enabled: true,
      },
      plotOptions: {
        series: {
          label: {
            connectorAllowed: false,
          },
          pointStart: 2,
        },
      },

      series: [
        {
          name: 'Số lượng',
          data: this.data,
        },
      ],
    };
    HC_exporting(Highcharts);
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);
  }
  onChange(event: any) {
    if (event.target.value === 'week') {
      this.OrderService.GetOnSeven().subscribe((res) => {
        this.dayOrder = res;
        this.data = [{}];
        this.data.pop();
        if (this.dayOrder.length > 0) {
          let i = 0;
          this.dayOrder.forEach((e: DayOrder) => {
            this.data.push(e.value);
            i++;
          });
        }
        this.chartOptions = {
          chart: {
            type: 'area',
          },
          title: {
            text: 'Số đơn hàng trong tuần',
          },
          subtitle: {
            text: 'Thứ 2 - Chủ nhật',
          },

          tooltip: {
            split: true,
            valueSuffix: ' đơn',
          },
          credits: {
            enabled: false,
          },
          exporting: {
            enabled: true,
          },

          plotOptions: {
            series: {
              label: {
                connectorAllowed: false,
              },
              pointStart: 2,
            },
          },
          series: [
            {
              name: 'Số lượng',
              data: this.data,
            },
          ],
        };
      });
      HC_exporting(Highcharts);
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 300);
    } else {
      if (event.target.value === 'month') {
        this.OrderService.GetOnMonth().subscribe((res) => {
          this.dayOrder = res;
          this.data = [{}];
          this.data.pop();
          if (this.dayOrder.length > 0) {
            let i = 0;
            this.dayOrder.forEach((e: DayOrder) => {
              this.data.push(e.value);
              i++;
            });
          }
          this.chartOptions = {
            series: [
              {
                name: 'Số lượng',
                data: this.data,
              },
            ],
          };
        });
        this.chartOptions = {
          chart: {
            type: 'area',
          },
          title: {
            text: 'Số đơn hàng trong tháng ' + (new Date().getMonth() + 1),
          },
          subtitle: {
            text: '',
          },
          tooltip: {
            split: true,
            valueSuffix: ' đơn',
          },
          credits: {
            enabled: false,
          },
          exporting: {
            enabled: true,
          },
          plotOptions: {
            series: {
              label: {
                connectorAllowed: false,
              },
              pointStart: 1,
            },
          },
        };
        HC_exporting(Highcharts);
        setTimeout(() => {
          window.dispatchEvent(new Event('resize'));
        }, 300);
      } else {
        this.OrderService.GetOnYear().subscribe((res) => {
          this.monthOrder = res;
          this.data = [{}];
          this.data.pop();
          if (this.dayOrder.length > 0) {
            let i = 0;
            this.monthOrder.forEach((e: MonthOrder) => {
              this.data.push(e.value);
              i++;
            });
          }
          this.chartOptions = {
            series: [
              {
                name: 'Số lượng',
                data: this.data,
              },
            ],
          };
        });
        this.chartOptions = {
          chart: {
            type: 'area',
          },
          title: {
            text: 'Số đơn hàng trong năm ' + new Date().getFullYear(),
          },
          subtitle: {
            text: '12 tháng',
          },
          tooltip: {
            split: true,
            valueSuffix: ' đơn',
          },
          credits: {
            enabled: false,
          },
          exporting: {
            enabled: true,
          },
          plotOptions: {
            series: {
              label: {
                connectorAllowed: false,
              },
              pointStart: 1,
            },
          },
        };
        HC_exporting(Highcharts);
        setTimeout(() => {
          window.dispatchEvent(new Event('resize'));
        }, 300);
      }
    }
  }
}
