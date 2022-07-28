import { Product } from './../Model/product';
import { filter, map } from 'rxjs/operators';
import { Slide } from './../Model/slide';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartItemList: any = [];
  public productList = new BehaviorSubject<any>([]);
  constructor() {}
  getProducts() {
    return this.productList.asObservable();
  }

  setProduct(product: any) {
    this.cartItemList.push(...product);
    this.productList.next(product);
  }
  addToCart(product: any) {
    if (this.cartItemList.length > 0) {
      let i = 0;
      this.cartItemList.map((e: any) => {
        i++;

        if (e.ProductId === product.ProductId) {
          e.quantity += product.quantity;
          if (e.quantity > 10) e.quantity = 10;
        } else if (i === this.cartItemList.length) {
          this.cartItemList.push(product);
          this.productList.next(this.cartItemList);
          this.getTotalPrice();
        }
      });
    } else {
      this.cartItemList.push(product);
      this.productList.next(this.cartItemList);
      this.getTotalPrice();
    }
  }

  changeCart(product: any) {
    let i = 0;
    this.cartItemList.map((e: any) => {
      i++;
      if (e.ProductId === product.ProductId) {
        e.quantity = product.quantity;
        this.getTotalPrice();
      }
    });
  }

  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.map((a: any) => {
      grandTotal += a.total * a.quantity;
    });
    return grandTotal;
  }
  removeCartItem(product: any) {
    this.cartItemList.map((a: any, index: any) => {
      if (product.ProductId === a.ProductId) {
        this.cartItemList.splice(index, 1);
      }
    });
    this.productList.next(this.cartItemList);
  }
  removeAllCart() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }
}
