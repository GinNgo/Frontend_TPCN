import { OrderService } from './../../../services/order.service';
import { CartService } from './../../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Order } from 'src/app/Model/order';
import { User } from 'src/app/Model/user';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';
import { OrderDetail } from 'src/app/Model/orderDetail';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss'],
})
export class CheckOutComponent implements OnInit {
  success = false;
  validLogin = localStorage.getItem('jwt');
  subject = new Subject<any>();
  products: any = [];
  grandTotal: number = 0;
  user!: User;
  note = '';
  order!: Order;
  constructor(
    private CartService: CartService,
    private router: Router,
    private userService: UserService,
    private OrderService: OrderService,
    private Http: HttpClient,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.CartService.getProducts().subscribe((res) => {
      this.products = res;
      this.grandTotal = this.CartService.getTotalPrice();
      // localStorage.removeItem('product');
      // localStorage.setItem('product', JSON.stringify(this.products));
    });

    //get data api
    if (this.validLogin) {
      // this.userService.getAcount().subscribe(
      //   (response) => {
      //     this.account = response;
      //     this.userId = this.account.UserId;
      //     this.Role = this.account.Role;
      //   }
      // },
      // (err) => {
      //   console.log(err);
      // }
      // );

      this.userService.getProfile().subscribe(
        (response) => {
          this.user = response;
        }
        // (err) => {
        //   console.log(err);
        // }
      );
    }
  }
  showSuccess() {
    this.toast.success({
      detail: 'Thông báo',
      summary: 'Mua thành công',
      duration: 5000,
    });
  }

  showError() {
    this.toast.error({
      detail: 'Lỗi',
      summary: 'Đặt hàng thất bại',
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
  removeItem(item: any) {
    this.CartService.removeCartItem(item);
  }
  emptyCart() {
    this.CartService.removeAllCart();
  }
  UpdateProfile() {
    this.userService.updateProfile(this.user).subscribe((res) => {});
  }
  checkout(grandTotal: number) {
    if (!this.validLogin) {
      this.router.navigate(['/dang-nhap']);
    } else {
      this.UpdateProfile();
      const order: Order = {
        CustomerId: this.user.UserId,
        Total: this.grandTotal,
        IsDeleted: 0,
        Status: true,
        Period: 'Chờ xác nhận',
        OrderId: 0,
        OrderDate: '',
        Note: this.note,
        isSelected: false,
      };
      console.log(order, this.user.Address);
      const orderDetail: OrderDetail = {
        OrderDetailId: 0,
        OrderId: 0,
        ProductId: 0,
        Price: 0,
        Quantity: 0,
        IsDeleted: 0,
      };

      if (confirm('Xác nhận bạn muốn đặt hàng? ')) {
        this.OrderService.createOrder(order).subscribe((res) => {
          orderDetail.OrderId = res;
          order.OrderId = res;
          let i = 0;
          this.products.forEach((e: any) => {
            orderDetail.Price = e.PriceDiscount;
            orderDetail.ProductId = e.ProductId;
            orderDetail.Quantity = e.quantity;
            i++;
            this.OrderService.createOrderDetail(orderDetail).subscribe((h) => {
              if (h === false) {
                this.success = false;
              }
              if (h && i == this.products.length) {
                this.success = true;
                if (this.success) {
                  this.emptyCart();
                  this.success = false;
                  this.Http.post<any>(
                    'https://localhost:44376/GmailService/' + order.OrderId,
                    order.OrderId
                  ).subscribe((e) => {
                    console.log(e);
                  });

                  this.showSuccess();
                } else {
                  this.showError();
                }
              }
            });
          });
        });
      }
    }
  }

  quatitiesMinus(product: any) {
    product.quantity -= 1;
    if (product.quantity < 1) this.CartService.removeCartItem(product);

    this.CartService.getProducts().subscribe((res) => {
      this.products = res;
      this.grandTotal = this.CartService.getTotalPrice();
      this.CartService.changeCart(product);
      localStorage.removeItem('product');
      localStorage.setItem('product', JSON.stringify(this.products));
    });
  }
  quatitiesPlus(product: any) {
    product.quantity += 1;
    if (product.quantity > 10) product.quantity = 10;
    this.CartService.getProducts().subscribe((res) => {
      this.products = res;

      this.grandTotal = this.CartService.getTotalPrice();
      this.CartService.changeCart(product);
      localStorage.removeItem('product');
      localStorage.setItem('product', JSON.stringify(this.products));
    });
  }
  somethingChanged(product: any) {
    if (product.quantity > 10) {
      product.quantity = 10;
    } else if (product.quantity < 1) {
      product.quantity = 1;
    }
    this.CartService.getProducts().subscribe((res) => {
      this.products = res;

      this.grandTotal = this.CartService.getTotalPrice();
      this.CartService.changeCart(product);
      localStorage.removeItem('product');
      localStorage.setItem('product', JSON.stringify(this.products));
    });
  }
}
