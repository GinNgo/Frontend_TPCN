import { BrandService } from './../../../../services/brand.service';
import { Brand } from './../../../../Model/brand';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Model/product';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.scss'],
})
export class BrandListComponent implements OnInit {
  brandList: Brand[] = [];

  //page
  totalLength: any;
  page: number = 1;
  isMasterSel = false;
  pcheckedBrandtList: any;
  constructor(private BrandService: BrandService) {}

  ngOnInit(): void {
    this.BrandService.getBrand().subscribe((res) => {
      this.brandList = res;
      this.totalLength = this.brandList.length;
    });
  }
  DeleteBrand() {
    if (confirm('Bạn muốn xóa tạm thời? ')) {
      console.log('Implement delete functionality here');
      this.pcheckedBrandtList.forEach((e: any) => {
        e.Status = false;
        e.IsDeleted = true;
      });
      this.pcheckedBrandtList.forEach((e: Brand) => {
        this.BrandService.trashBrand(e).subscribe((res) => {
          this.BrandService.getBrand().subscribe((res) => {
            this.brandList = res;
            this.totalLength = this.brandList.length;
          });
        });
      });
    }
  }
  checkUncheckAll() {
    for (var i = 0; i < this.brandList.length; i++) {
      this.brandList[i].isSelected = this.isMasterSel;
    }

    this.getCheckedItemList();
  }

  isAllSelected() {
    this.isMasterSel = this.brandList.every(function (item: any) {
      return item.isSelected == true;
    });

    this.getCheckedItemList();
  }

  getCheckedItemList() {
    this.pcheckedBrandtList = [];

    for (var i = 0; i < this.brandList.length; i++) {
      if (this.brandList[i].isSelected)
        this.pcheckedBrandtList.push(this.brandList[i]);
    }
    console.log(this.pcheckedBrandtList);
    // this.pcheckedBrandtList = JSON.stringify(this.pcheckedBrandtList);
  }
  clickMethod(name: string) {
    if (confirm('Are you sure to delete ' + name)) {
      console.log('Implement delete functionality here');
    }
  }
  TogglleStatus() {
    if (confirm('Bạn muốn chuyển đổi trạng thái thương hiệu? ')) {
      this.pcheckedBrandtList.forEach((e: any) => {
        e.Status = !e.Status;
      });
      this.pcheckedBrandtList.forEach((e: Brand) => {
        this.BrandService.trashBrand(e).subscribe((res) => {
          console.log(res);
        });
      });
    }
  }
  addBrandName(event: any) {
    const BrandName = event;
    if (BrandName) {
      this.BrandService.getBrandByName(BrandName).subscribe((res) => {
        this.brandList = res;
        this.totalLength = this.brandList.length;
      });
    } else {
      this.BrandService.getBrand().subscribe((res) => {
        this.brandList = res;
        this.totalLength = this.brandList.length;
      });
    }
  }
}
