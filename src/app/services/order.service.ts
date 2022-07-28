import { OrderDetail } from '../Model/orderDetail';
import { Order } from '../Model/order';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private Http: HttpClient) {}
  readonly APIUrl = 'https://localhost:44376/api/order/';
  GetNumberOrder() {
    return this.Http.get<number>(this.APIUrl);
  }
  GetProductSold() {
    return this.Http.get<any>(this.APIUrl + 'getProductSold/');
  }
  GetOrderByUserId(UserId: number) {
    return this.Http.get<Order[]>(this.APIUrl + 'getOrderByUserId/' + UserId);
  }
  GetOnSeven() {
    return this.Http.get<any>(this.APIUrl + 'getOnSeven/');
  }
  GetOnMonth() {
    return this.Http.get<any>(this.APIUrl + 'getOnMonth/');
  }
  GetOnYear() {
    return this.Http.get<any>(this.APIUrl + 'getOnYear/');
  }
  GetPriceDay() {
    return this.Http.get<DayOrder>(this.APIUrl + 'getPriceDay/');
  }
  GetNumberPrice() {
    return this.Http.get<number>(this.APIUrl + 'getNumberPrice/');
  }
  GetNumberProduct() {
    return this.Http.get<number>(this.APIUrl + 'getNumberProduct/');
  }
  GetNumberProductToDay() {
    return this.Http.get<number>(this.APIUrl + 'getNumberProductToDay/');
  }
  getOrderByName(orderId: string) {
    return this.Http.get<Order[]>(this.APIUrl + 'getOrder/' + orderId);
  }
  GetOrderDetailByOrderId(OrderId: number) {
    return this.Http.get<OrderDetail[]>(
      this.APIUrl + 'getOrderDetailByOrderId/' + OrderId
    );
  }
  getOrderByOrderId(OrderId: number) {
    return this.Http.get<Order>(this.APIUrl + 'getOrderByOrderId/' + OrderId);
  }
  GetOrderForDashBoard() {
    return this.Http.get<Order[]>(this.APIUrl + 'getOrderForDashBoard');
  }
  DeleteOrder(OrderId: number) {
    return this.Http.delete<boolean>(this.APIUrl + OrderId);
  }

  createOrder(order: Order) {
    console.log(order);
    return this.Http.post<number>(this.APIUrl + 'createOrder/' + order, order);
  }
  createOrderDetail(orderDetail: any) {
    return this.Http.post<boolean>(
      this.APIUrl + 'createOrderDetail/' + orderDetail,
      orderDetail
    );
  }
  updateOrder(order: any) {
    return this.Http.put<boolean>(this.APIUrl + order, order);
  }
}
export interface DayOrder {
  day: number;
  value: number;
  totalPrice: number;
}
