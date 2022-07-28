import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/Model/category';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  catList: Category[] = [];
  catSearch: Category[] = [];
  //page
  totalLength: any;
  page: number = 1;
  isMasterSel = false;
  pcheckedCategorytList: any;
  constructor(private CategoryService: CategoriesService) {}

  ngOnInit(): void {
    this.CategoryService.getCatDashBoard().subscribe((res) => {
      this.catList = res;
      this.catSearch = res;
      this.totalLength = this.catList.length;
    });
  }
  TogglleStatus() {
    if (confirm('Bạn muốn chuyển đổi trạng thái sản phẩm? ')) {
      this.pcheckedCategorytList.forEach((e: any) => {
        e.Status = !e.Status;
      });
      this.pcheckedCategorytList.forEach((e: Category) => {
        this.CategoryService.trashCategory(e).subscribe((res) => {
          console.log(res);
        });
      });
    }
  }
  DeleteCat() {
    if (confirm('Bạn muốn xóa tạm thời? ')) {
      console.log('Implement delete functionality here');
      this.pcheckedCategorytList.forEach((e: any) => {
        e.Status = false;
        e.IsDeleted = true;
      });
      this.pcheckedCategorytList.forEach((e: Category) => {
        this.CategoryService.trashCategory(e).subscribe((res) => {
          this.CategoryService.getCatDashBoard().subscribe((res) => {
            this.catList = res;
            this.totalLength = this.catList.length;
          });
        });
      });
    }
  }
  checkUncheckAll() {
    for (var i = 0; i < this.catList.length; i++) {
      this.catList[i].isSelected = this.isMasterSel;
    }

    this.getCheckedItemList();
  }

  isAllSelected() {
    this.isMasterSel = this.catList.every(function (item: any) {
      return item.isSelected == true;
    });

    this.getCheckedItemList();
  }

  getCheckedItemList() {
    this.pcheckedCategorytList = [];

    for (var i = 0; i < this.catList.length; i++) {
      if (this.catList[i].isSelected)
        this.pcheckedCategorytList.push(this.catList[i]);
    }
    console.log(this.pcheckedCategorytList);
    // this.pcheckedCategorytList = JSON.stringify(this.pcheckedCategorytList);
  }
  clickMethod(name: string) {
    if (confirm('Are you sure to delete ' + name)) {
      console.log('Implement delete functionality here');
    }
  }
  addCategoryName(event: any) {
    const CatName = event;
    console.log(CatName);

    if (CatName) {
      this.CategoryService.getCategoryByName(CatName).subscribe((res) => {
        this.catList = res;
        this.totalLength = this.catList.length;
      });
    } else {
      this.CategoryService.getCatDashBoard().subscribe((res) => {
        this.catList = res;
        this.totalLength = this.catList.length;
      });
    }
  }
}
