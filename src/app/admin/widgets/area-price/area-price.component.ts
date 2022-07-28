import { OrderService } from './../../../services/order.service';
import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { WeekDay } from '@angular/common';
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
  selector: 'app-widget-area-price',
  templateUrl: './area-price.component.html',
  styleUrls: ['./area-price.component.scss'],
})
export class AreaPriceComponent implements OnInit {
  chartOptions: {} = {};
  constructor(private OrderService: OrderService) {}
  dayOrder: DayOrder[] = [];
  data: any[] = [{}];
  monthOrder: MonthOrder[] = [];
  Highcharts = Highcharts;
  ngOnInit(): void {
    this.OrderService.GetOnSeven().subscribe((res) => {
      this.dayOrder = res;
      this.data.pop();
      if (this.dayOrder.length > 0) {
        let i = 0;
        this.dayOrder.forEach((e: DayOrder) => {
          this.data.push(e.totalPrice);
          i++;
        });
      }
      this.chartOptions = {
        series: [
          {
            name: 'Số tiền',
            data: this.data,
          },
        ],
      };
    });
    this.chartOptions = {
      title: {
        text: 'Doanh thu trong tuần ',
      },

      subtitle: {
        text: 'Thứ 2 - Chủ nhật',
      },
      tooltip: {
        split: true,
        valueSuffix: ' đồng',
      },
      yAxis: {
        title: {
          text: 'Số tiền bản được',
        },
      },

      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
      },
      credits: {
        enable: false,
      },
      exporting: {
        endble: true,
      },
      plotOptions: {
        series: {
          label: {
            connectorAllowed: false,
          },
          pointStart: 1,
        },
      },

      series: [
        {
          name: 'Số tiền: ',
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
            this.data.push(e.totalPrice);
            i++;
          });
        }
        this.chartOptions = {
          title: {
            text: 'Doanh thu trong tuần',
          },

          subtitle: {
            text: 'Thứ 2 - Chủ nhật',
          },
          tooltip: {
            split: true,
            valueSuffix: ' đồng',
          },
          yAxis: {
            title: {
              text: 'Số tiền bản được',
            },
          },

          legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
          },
          credits: {
            enable: false,
          },
          exporting: {
            endble: true,
          },
          plotOptions: {
            series: {
              label: {
                connectorAllowed: false,
              },
              pointStart: 1,
            },
          },

          series: [
            {
              name: 'Đồng',
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
              this.data.push(e.totalPrice);
              i++;
            });
          }
          this.chartOptions = {
            title: {
              text: 'Doanh thu trong tháng ' + (new Date().getMonth() + 1),
            },

            subtitle: {
              text: '',
            },
            tooltip: {
              split: true,
              valueSuffix: ' đồng',
            },
            yAxis: {
              title: {
                text: 'Số tiền bản được',
              },
            },

            legend: {
              layout: 'vertical',
              align: 'right',
              verticalAlign: 'middle',
            },
            credits: {
              enable: false,
            },
            exporting: {
              endble: true,
            },
            plotOptions: {
              series: {
                label: {
                  connectorAllowed: false,
                },
                pointStart: 1,
              },
            },

            series: [
              {
                name: 'Số tiền: ',
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
        this.OrderService.GetOnYear().subscribe((res) => {
          this.monthOrder = res;
          this.data = [{}];
          this.data.pop();
          if (this.dayOrder.length > 0) {
            let i = 0;
            this.monthOrder.forEach((e: MonthOrder) => {
              this.data.push(e.totalPrice);
              i++;
            });
          }
          this.chartOptions = {
            series: [
              {
                name: 'Đồng',
                data: this.data,
              },
            ],
          };
        });
        this.chartOptions = {
          title: {
            text: 'Doanh thu trong năm ' + new Date().getFullYear(),
          },

          subtitle: {
            text: '12 tháng',
          },
          tooltip: {
            split: true,
            valueSuffix: ' đồng',
          },
          yAxis: {
            title: {
              text: 'Số tiền bản được',
            },
          },

          legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
          },
          credits: {
            enable: false,
          },
          exporting: {
            endble: true,
          },
          plotOptions: {
            series: {
              label: {
                connectorAllowed: false,
              },
              pointStart: 1,
            },
          },

          series: [
            {
              name: 'Số tiền: ',
              data: this.data,
            },
          ],
        };
        HC_exporting(Highcharts);
        setTimeout(() => {
          window.dispatchEvent(new Event('resize'));
        }, 300);
      }
    }
  }
}
