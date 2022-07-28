import { Order } from './../../../Model/order';
import { Product } from './../../../Model/product';
import { OrderDetail } from '../../../Model/orderDetail';

import { User } from '../../../Model/user';
import { OrderService } from './../../../services/order.service';

import { CartService } from './../../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './../../../services/user.service';

import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-shoppinp-cart',
  templateUrl: './shoppinp-cart.component.html',
  styleUrls: ['./shoppinp-cart.component.scss'],
})
export class ShoppinpCartComponent implements OnInit {
  success = false;
  validLogin = localStorage.getItem('jwt');
  subject = new Subject<any>();
  products: any = [];
  grandTotal: number = 0;
  user!: User;
  order!: Order;
  constructor(
    private CartService: CartService,
    private router: Router,
    private userService: UserService,
    private OrderService: OrderService,
    private Http: HttpClient
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
  removeItem(item: any) {
    this.CartService.removeCartItem(item);
  }
  emptyCart() {
    this.CartService.removeAllCart();
  }
  // checkout(grandTotal: number) {
  //   if (!this.validLogin) {
  //     this.router.navigate(['/dang-nhap']);
  //   }
  //   const order: Order = {
  //     CustomerId: this.user.UserId,
  //     Total: this.grandTotal,
  //     IsDeleted: 0,
  //     Status: true,
  //     Period: 'Chờ xác nhận',
  //     OrderId: 0,
  //     OrderDate: '',
  //     Note: '',
  //     isSelected: false,
  //   };

  //   const orderDetail: OrderDetail = {
  //     OrderDetailId: 0,
  //     OrderId: 0,
  //     ProductId: 0,
  //     Price: 0,
  //     Quantity: 0,
  //     IsDeleted: 0,
  //   };
  //   if (confirm('Xác nhận bạn muốn đặt hàng? ')) {
  //     this.OrderService.createOrder(order).subscribe((res) => {
  //       orderDetail.OrderId = res;
  //       order.OrderId = res;
  //       let i = 0;
  //       this.products.forEach((e: any) => {
  //         orderDetail.Price = e.PriceDiscount;
  //         orderDetail.ProductId = e.ProductId;
  //         orderDetail.Quantity = e.quantity;
  //         i++;
  //         this.OrderService.createOrderDetail(orderDetail).subscribe((h) => {
  //           if (h === false) {
  //             this.success = false;
  //           }
  //           if (h && i == this.products.length) {
  //             this.success = true;
  //             if (this.success) {
  //               this.emptyCart();
  //               this.success = false;
  //               this.Http.post<any>(
  //                 'https://localhost:44376/GmailService/' + order.OrderId,
  //                 order.OrderId
  //               ).subscribe((e) => {
  //                 console.log(e);
  //               });

  //               window.alert('Đặt hàng thành công');
  //             } else {
  //               window.alert('Đặt hàng không thành công');
  //             }
  //           }
  //         });
  //       });
  //     });
  //   }
  // }
  // (click)="checkout(grandTotal)"
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
