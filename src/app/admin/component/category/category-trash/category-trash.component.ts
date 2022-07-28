import { Category } from 'src/app/Model/category';
import { CategoriesService } from 'src/app/services/categories.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-trash',
  templateUrl: './category-trash.component.html',
  styleUrls: ['./category-trash.component.scss'],
})
export class CategoryTrashComponent implements OnInit {
  catList: Category[] = [];
  catSearch: Category[] = [];
  //page
  totalLength: any;
  page: number = 1;
  isMasterSel = false;
  pcheckedCatList: any;
  constructor(private CategoryService: CategoriesService) {}

  ngOnInit(): void {
    this.CategoryService.getTrashCategory().subscribe((res) => {
      this.catList = res;
      this.catSearch = res;
      this.totalLength = this.catList.length;
    });
  }
  addCategoryName(event: any) {
    const CatName = event;
    console.log(CatName);

    if (CatName) {
      this.CategoryService.getTrashCategoryByName(CatName).subscribe((res) => {
        this.catList = res;
        this.totalLength = this.catList.length;
      });
    } else {
      this.CategoryService.getTrashCategory().subscribe((res) => {
        this.catList = res;
        this.totalLength = this.catList.length;
      });
    }
  }
  checkUncheckAll() {
    for (var i = 0; i < this.catList.length; i++) {
      this.catList[i].isSelected = this.isMasterSel;
    }

    this.getCheckedItemList();
  }
  toggleCategory() {
    if (confirm('Bạn muốn phục hồi sản phẩm? ')) {
      this.pcheckedCatList.forEach((e: any) => {
        var x = e.CatName.substring(e.CatName.lastIndexOf('>') + 1);
        e.CatName = x;
        e.Status = true;
        e.IsDeleted = false;
      });
      this.pcheckedCatList.forEach((e: any) => {
        this.CategoryService.trashCategory(e).subscribe((res) => {
          this.CategoryService.getTrashCategory().subscribe((res) => {
            this.catList = res;
            this.totalLength = this.catList.length;
          });
        });
      });
    }
  }
  deleteCategory() {
    if (confirm('Bạn muốn xóa sản phẩm? ')) {
      console.log('Implement delete functionality here');
      this.pcheckedCatList.forEach((e: Category) => {
        this.CategoryService.deleteCategory(e.CatId).subscribe((resDelete) => {
          this.CategoryService.getTrashCategory().subscribe((res) => {
            this.catList = res;
            this.totalLength = this.catList.length;
          });
        });
      });
    }
  }
  isAllSelected() {
    this.isMasterSel = this.catList.every(function (item: any) {
      return item.isSelected == true;
    });

    this.getCheckedItemList();
  }

  getCheckedItemList() {
    this.pcheckedCatList = [];

    for (var i = 0; i < this.catList.length; i++) {
      if (this.catList[i].isSelected)
        this.pcheckedCatList.push(this.catList[i]);
    }
    console.log(this.pcheckedCatList);
    // this.pcheckedCatList = JSON.stringify(this.pcheckedCatList);
  }
  clickMethod(name: string) {
    if (confirm('Are you sure to delete ' + name)) {
      console.log('Implement delete functionality here');
    }
  }
}
