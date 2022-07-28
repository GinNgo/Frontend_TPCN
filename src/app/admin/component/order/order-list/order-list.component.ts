import { ProductService } from './../../../../services/product.service';
import { UserService } from './../../../../services/user.service';
import { NgForm } from '@angular/forms';
import { OrderService } from './../../../../services/order.service';
import { Order, OrderExport } from './../../../../Model/order';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Model/user';
import { Product } from 'src/app/Model/product';
import { NgToastService } from 'ng-angular-popup';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  orderList: Order[] = [];

  period = [
    {
      value: 'Chờ xác nhận',
    },
    { value: 'Đang chuẩn bị hàng' },
    { value: 'Đang vận chuyển' },
    { value: 'Đang giao hàng' },
    { value: 'Đã nhận' },
    { value: 'Đã hủy' },
  ];
  toggleExport = false;
  List: Array<OrderExport> = [];
  //page
  user: User[] = [];
  status = '';
  reason = '';
  totalLength: any;
  page: number = 1;
  isMasterSel = false;
  cancel = false;
  pcheckedOrdertList: any;
  constructor(
    private OrderService: OrderService,
    private UserService: UserService,
    private ProductService: ProductService,
    private toast: NgToastService,
    private Http: HttpClient
  ) {}

  ngOnInit(): void {
    this.OrderService.GetOrderForDashBoard().subscribe((res) => {
      this.orderList = res;

      this.orderList.forEach((e) => {
        this.UserService.getUserById(e.CustomerId).subscribe((res) => {
          var x = {
            OrderId: e.OrderId,
            Fullname: res.Fullname,
            Address: res.Address,
            Phone: res.Phone,
            Email: res.Email,
            OrderDate: e.OrderDate,
            Total: e.Total,
            Period: e.Period,
            Note: e.Note,
          };
          this.List.push(x);
          this.user.push(res);
        });
      });
      this.totalLength = this.orderList.length;
    });
  }
  showSuccess() {
    this.toast.success({
      detail: 'Thông báo',
      summary: 'Thay đổi trạng thái thành công',
      duration: 5000,
    });
  }

  showError() {
    this.toast.error({
      detail: 'Lỗi',
      summary: 'Thay đổi trạng thái thất bại',
      sticky: true,
      duration: 5000,
    });
  }

  showInfo() {
    this.toast.info({
      detail: 'INFO',
      summary: 'Your Info Message',
      sticky: true,
    });
  }

  showWarn() {
    this.toast.warning({
      detail: 'WARN',
      summary: 'Your Warn Message',
      duration: 5000,
    });
  }
  addOrderName(event: any) {
    const OrderId = event;

    if (OrderId) {
      this.OrderService.getOrderByName(OrderId).subscribe((res) => {
        this.orderList = res;
        this.orderList.forEach((e) => {
          this.UserService.getUserById(e.CustomerId).subscribe((res) => {
            var x = {
              OrderId: e.OrderId,
              Fullname: res.Fullname,
              Address: res.Address,
              Phone: res.Phone,
              Email: res.Email,
              OrderDate: e.OrderDate,
              Total: e.Total,
              Period: e.Period,
              Note: e.Note,
            };
            this.List.push(x);
            this.user.push(res);
          });
        });
        this.totalLength = this.orderList.length;
      });
    } else {
      this.OrderService.GetOrderForDashBoard().subscribe((res) => {
        this.orderList = res;
        this.orderList.forEach((e) => {
          this.UserService.getUserById(e.CustomerId).subscribe((res) => {
            var x = {
              OrderId: e.OrderId,
              Fullname: res.Fullname,
              Address: res.Address,
              Phone: res.Phone,
              Email: res.Email,
              OrderDate: e.OrderDate,
              Total: e.Total,
              Period: e.Period,
              Note: e.Note,
            };
            this.List.push(x);
            this.user.push(res);
          });
        });
        this.totalLength = this.orderList.length;
      });
    }
  }
  checkUncheckAll() {
    for (var i = 0; i < this.orderList.length; i++) {
      this.orderList[i].isSelected = this.isMasterSel;
    }

    this.getCheckedItemList();
  }
  ite!: Order;
  sendValues() {
    this.OrderService.updateOrder(this.ite).subscribe((res) => {
      console.log(res);
      if (res === true) {
        this.Http.post<any>(
          'https://localhost:44376/GmailServiceCancel/' +
            this.ite.OrderId +
            '/' +
            this.reason,
          [this.ite.OrderId, this.reason]
        ).subscribe((e) => {
          console.log(e);
        });
        this.showSuccess();
        this.cancel = false;
        this.reason = '';
        this.OrderService.GetOrderForDashBoard().subscribe((res) => {
          this.orderList = res;
          this.orderList.forEach((e) => {
            this.UserService.getUserById(e.CustomerId).subscribe((res) => {
              this.user.push(res);
            });
          });
          this.totalLength = this.orderList.length;
        });
      }
    });
  }
  changePeriod(event: NgForm, item: Order) {
    item.Period = event.value.period;
    this.ite = item;
    if (item.Period === 'Đã hủy') {
      this.cancel = true;
    } else {
      console.log(item);
      this.OrderService.updateOrder(item).subscribe((res) => {
        console.log(res);
        if (res === true) {
          this.showSuccess();
          this.OrderService.GetOrderForDashBoard().subscribe((res) => {
            this.orderList = res;
            this.orderList.forEach((e) => {
              this.UserService.getUserById(e.CustomerId).subscribe((res) => {
                this.user.push(res);
              });
            });
            this.totalLength = this.orderList.length;
          });
        }
      });
    }
  }
  isAllSelected() {
    this.isMasterSel = this.orderList.every(function (item: any) {
      return item.isSelected == true;
    });

    this.getCheckedItemList();
  }

  getCheckedItemList() {
    this.pcheckedOrdertList = [];

    for (var i = 0; i < this.orderList.length; i++) {
      if (this.orderList[i].isSelected)
        this.pcheckedOrdertList.push(this.orderList[i]);
    }
    console.log(this.pcheckedOrdertList);
    // this.pcheckedOrdertList = JSON.stringify(this.pcheckedOrdertList);
  }
  clickMethod(name: string) {
    if (confirm('Are you sure to delete ' + name)) {
      console.log('Implement delete functionality here');
    }
  }

  convertToPDF() {
    var x = document.getElementById('contentToConvert');
    if (x)
      html2canvas(x).then((canvas) => {
        // Few necessary setting options

        const contentDataURL = canvas.toDataURL('image/png');
        let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
        var width = pdf.internal.pageSize.getWidth();
        var height = (canvas.height * width) / canvas.width;
        pdf.addImage(contentDataURL, 'PNG', 0, 0, width, height);
        pdf.save('donhang.pdf'); // Generated PDF
      });
  }
  getColor(periodTitle: string) {
    if (periodTitle === 'Đang chuẩn bị hàng') {
      return 'aquamarine';
    } else {
      if (periodTitle === 'Đang vận chuyển') {
        return 'aqua';
      } else {
        if (periodTitle === 'Đang giao hàng') {
          return 'rgb(211, 20, 163)';
        } else {
          if (periodTitle === 'Đã nhận') return 'rgb(28, 50, 241)';
          else if (periodTitle === 'Đã hủy') return 'red';
        }
      }
    }
    return '';
  }
}
