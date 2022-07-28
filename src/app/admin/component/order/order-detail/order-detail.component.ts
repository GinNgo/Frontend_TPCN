import { UserService } from './../../../../services/user.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from './../../../../Model/product';
import { OrderService } from './../../../../services/order.service';
import { OrderDetail } from './../../../../Model/orderDetail';

import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { User } from 'src/app/Model/user';
import { Order } from 'src/app/Model/order';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent implements OnInit {
  List!: OrderDetail;

  editImage = false;

  id = 0;
  Order!: Order;
  OrderDetail: OrderDetail[] = [];
  Product: Product[] = [];
  User!: User;
  totalLength: any;
  page: number = 1;
  constructor(
    private OrderService: OrderService,
    private route: ActivatedRoute,
    private ProductService: ProductService,
    private UserService: UserService
  ) {}

  ngOnInit(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    this.id = this.route.snapshot.params['orderId'];
    this.OrderService.getOrderByOrderId(this.id).subscribe((res) => {
      this.Order = res;
      this.UserService.getUserById(res.CustomerId).subscribe((resUser) => {
        this.User = resUser;
      });
    });
    this.OrderService.GetOrderDetailByOrderId(this.id).subscribe((res) => {
      this.OrderDetail = res;
      console.log(this.OrderDetail);
      this.OrderDetail.forEach((e) => {
        this.ProductService.getProductById(e.ProductId).subscribe((res) => {
          this.Product.push(res);
        });
      });
      this.totalLength = this.OrderDetail.length;
    });
  }
}
