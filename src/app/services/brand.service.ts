import { Brand } from './../Model/brand';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  readonly APIUrl = 'https://localhost:44376/api/brand/';
  constructor(private Http: HttpClient) {}
  getBrand() {
    return this.Http.get<Brand[]>(this.APIUrl + 'getBrand');
  }
  getBrandById(id: number) {
    return this.Http.get<Brand>(this.APIUrl + 'getBrandById/' + id);
  }
  getTrashBrand() {
    return this.Http.get<Brand[]>(this.APIUrl + 'getTrashBrand');
  }

  getTrashBrandByName(BrandName: string) {
    return this.Http.get<Brand[]>(
      this.APIUrl + 'getTrashBrandByName/' + BrandName
    );
  }
  getBrandByName(BrandName: string) {
    return this.Http.get<Brand[]>(this.APIUrl + 'getBrandByName/' + BrandName);
  }

  trashBrand(brand: any) {
    return this.Http.put<any>(this.APIUrl + brand, brand);
  }
  createBrand(brand: any) {
    return this.Http.post<any>(this.APIUrl + brand, brand);
  }
  editBrand(brand: any) {
    return this.Http.put<any>(this.APIUrl + brand, brand);
  }
  deleteBrand(brand: any) {
    return this.Http.delete<any>(this.APIUrl + brand, brand);
  }
}
