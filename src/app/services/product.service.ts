import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../Model/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private Http: HttpClient) {}
  readonly APIUrl = 'https://localhost:44376/api/product/';
  getProduct() {
    return this.Http.get<Product[]>(this.APIUrl);
  }
  getProductDashboard() {
    return this.Http.get<Product[]>(this.APIUrl + 'getAllProductForDashboard/');
  }

  getAllProductIsTrash() {
    return this.Http.get<Product[]>(this.APIUrl + 'getAllProductIsTrash');
  }
  getProductName() {
    return this.Http.get<string[]>(this.APIUrl + 'getProductName');
  }
  getProductByName(name: string) {
    return this.Http.get<Product[]>(this.APIUrl + 'getProductByName/' + name);
  }
  getProductByNameTrash(name: string) {
    return this.Http.get<Product[]>(
      this.APIUrl + 'getProductByNameTrash/' + name
    );
  }
  getProductById(id: number) {
    return this.Http.get<Product>(this.APIUrl + id);
  }
  getFiveProduct() {
    return this.Http.get<Product[]>(this.APIUrl + 'new');
  }
  getProductByPercent(percent: number) {
    return this.Http.get<Product[]>(this.APIUrl + 'percent/' + percent);
  }
  getProductByPercentAll(percent: number) {
    return this.Http.get<Product[]>(this.APIUrl + 'percentAll/' + percent);
  }
  getProductByPercentHome(percent: number) {
    return this.Http.get<Product[]>(this.APIUrl + 'percentHome/' + percent);
  }
  getProductRandom() {
    return this.Http.get<Product[]>(this.APIUrl + 'random/');
  }
  getProductByCatFive(CatId: number) {
    return this.Http.get<Product[]>(
      this.APIUrl + 'getProductByCatFive/' + CatId
    );
  }
  getProductByCat(listCatId: number) {
    return this.Http.get<Product[]>(
      this.APIUrl + 'getProductByCat/' + listCatId
    );
  }
  createProduct(tblProduct: any) {
    return this.Http.post<number>(
      this.APIUrl + 'createProduct/' + tblProduct,
      tblProduct
    );
  }
  editProduct(Product: any) {
    return this.Http.put<boolean>(
      this.APIUrl + 'editProduct/' + Product,
      Product
    );
  }
  trashProduct(ProductTrash: Product) {
    return this.Http.put<boolean>(
      this.APIUrl + 'editProduct/' + ProductTrash,
      ProductTrash
    );
  }

  deleteProduct(ProductTrash: number) {
    return this.Http.delete<string>(
      this.APIUrl + 'deleteProduct/' + ProductTrash
    );
  }
}
