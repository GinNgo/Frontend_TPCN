import { OrderService } from './../../../services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Account } from 'src/app/Model/account';
import { User } from 'src/app/Model/user';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  numberUse = 0;
  dayOrder: DayOrder = { totalPrice: 0, day: 0, value: 0 };
  validLogin = localStorage.getItem('jwt');
  numberOrder = 0;
  numberPrice = 0;
  numberPro = 0;
  numberProToDay = 0;
  numberOrderDay = 0;
  numberPriceDay = 0;
  productSold: ProductSold[] = [];
  displayedColumns: string[] = [
    'Postition',
    'ProductName',
    'Brand',
    'Origin',
    'Quantity',
  ];
  dataSource = new MatTableDataSource<ProductSold>();
  account!: Account;
  user!: User;
  userId: number = 0;
  Role = 0;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private userService: UserService,
    private OrderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.OrderService.GetPriceDay().subscribe((res: DayOrder) => {
      this.dayOrder = res;
    });

    this.userService.getNumberUsers().subscribe((res) => {
      this.numberUse = res;
    });

    this.OrderService.GetNumberOrder().subscribe((res) => {
      this.numberOrder = res;
    });
    this.OrderService.GetNumberPrice().subscribe((res) => {
      this.numberPrice = res;
    });
    this.OrderService.GetNumberProduct().subscribe((res) => {
      this.numberPro = res;
    });
    this.OrderService.GetNumberProductToDay().subscribe((res) => {
      this.numberProToDay = res;
      console.log(this.numberProToDay);
    });

    this.OrderService.GetProductSold().subscribe((res) => {
      this.productSold = res;

      this.dataSource = new MatTableDataSource<ProductSold>(this.productSold);
      this.dataSource.paginator = this.paginator;

      setTimeout(() => (this.dataSource.paginator = this.paginator));
    });
  }
}
export interface ProductSold {
  Postition: number;
  ProductName: string;
  Brand: string;
  Origin: string;
  Quantity: number;
}
export interface DayOrder {
  day: number;
  value: number;
  totalPrice: number;
}
