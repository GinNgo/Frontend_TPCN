import { BrandService } from 'src/app/services/brand.service';
import { Brand } from 'src/app/Model/brand';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brand-trash',
  templateUrl: './brand-trash.component.html',
  styleUrls: ['./brand-trash.component.scss'],
})
export class BrandTrashComponent implements OnInit {
  brandList: Brand[] = [];

  //page
  totalLength: any;
  page: number = 1;
  isMasterSel = false;
  pcheckedBrandtList: any;
  constructor(private BrandService: BrandService) {}

  ngOnInit(): void {
    this.BrandService.getTrashBrand().subscribe((res) => {
      this.brandList = res;
      this.totalLength = this.brandList.length;
    });
  }

  checkUncheckAll() {
    for (var i = 0; i < this.brandList.length; i++) {
      this.brandList[i].isSelected = this.isMasterSel;
    }

    this.getCheckedItemList();
  }
  toggleBrand() {
    if (confirm('Bạn muốn phục hồi sản phẩm? ')) {
      this.pcheckedBrandtList.forEach((e: any) => {
        e.Status = true;
        e.IsDeleted = false;
      });
      this.pcheckedBrandtList.forEach((e: any) => {
        this.BrandService.trashBrand(e).subscribe((res) => {
          this.BrandService.getTrashBrand().subscribe((res) => {
            this.brandList = res;
            this.totalLength = this.brandList.length;
          });
        });
      });
      window.location.reload();
    }
  }
  deleteBrand() {
    if (confirm('Bạn muốn xóa sản phẩm? ')) {
      console.log('Implement delete functionality here');
      this.pcheckedBrandtList.forEach((e: Brand) => {
        this.BrandService.deleteBrand(e.BrandId).subscribe((res) => {
          this.BrandService.getTrashBrand().subscribe((res) => {
            this.brandList = res;
            this.totalLength = this.brandList.length;
          });
        });
      });
    }
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
  addBrandName(event: any) {
    const BrandName = event;
    if (BrandName) {
      this.BrandService.getTrashBrandByName(BrandName).subscribe((res) => {
        this.brandList = res;
        this.totalLength = this.brandList.length;
      });
    } else {
      this.BrandService.getTrashBrand().subscribe((res) => {
        this.brandList = res;
        this.totalLength = this.brandList.length;
      });
    }
  }
}
