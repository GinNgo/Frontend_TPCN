import { Category } from './../Model/category';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private Http: HttpClient) {}
  readonly APIUrl = 'https://localhost:44376/api/category/';
  getCat() {
    return this.Http.get<Category[]>(this.APIUrl + 'getCategory');
  }
  getCategoryByParentId(id: number) {
    return this.Http.get<Category[]>(
      this.APIUrl + 'getCategoryByParentId/' + id
    );
  }
  getCatDashBoard() {
    return this.Http.get<Category[]>(this.APIUrl + 'getCategoryAll');
  }
  getCatCreate() {
    return this.Http.get<Category[]>(this.APIUrl + 'getCategoryAllCreate');
  }
  getCatAddProduct() {
    return this.Http.get<Category[]>(this.APIUrl + 'getCatAddProduct');
  }
  getTrashCategoryByName(CategoryName: string) {
    return this.Http.get<Category[]>(
      this.APIUrl + 'getTrashCategoryByName/' + CategoryName
    );
  }
  getCategoryByName(CategoryName: string) {
    return this.Http.get<Category[]>(
      this.APIUrl + 'getCategoryByName/' + CategoryName
    );
  }
  getBreadCrumb(id: number) {
    return this.Http.get<Category[]>(this.APIUrl + 'breadCrumb/' + id);
  }
  getIdCatForProduct(CatId: number) {
    return this.Http.get<number[]>(this.APIUrl + 'getIdCatForProduct/' + CatId);
  }

  getCategoryById(id: number) {
    return this.Http.get<Category>(this.APIUrl + 'getCategoryById/' + id);
  }
  getTrashCategory() {
    return this.Http.get<Category[]>(this.APIUrl + 'getTrashCategory');
  }
  trashCategory(category: any) {
    return this.Http.put<any>(this.APIUrl + category, category);
  }
  createCategory(category: any) {
    return this.Http.post<any>(this.APIUrl + category, category);
  }
  editCategory(category: any) {
    return this.Http.put<any>(this.APIUrl + category, category);
  }
  deleteCategory(category: number) {
    return this.Http.delete<any>(this.APIUrl + category);
  }
}
