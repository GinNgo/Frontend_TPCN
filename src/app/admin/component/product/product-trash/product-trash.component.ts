import { ProMapCatService } from './../../../../services/ProMapCat.service';
import { Image } from 'src/app/Model/image';
import { ImageService } from './../../../../services/image.service';
import { ProductService } from './../../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Model/product';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-trash',
  templateUrl: './product-trash.component.html',
  styleUrls: ['./product-trash.component.scss'],
})
export class ProductTrashComponent implements OnInit {
  productList: Product[] = [];

  //page
  totalLength: any;
  page: number = 1;
  isMasterSel = false;
  checkedProductList: any;
  constructor(
    private ProductService: ProductService,
    private ImageService: ImageService,
    private ProMapCatService: ProMapCatService
  ) {}

  ngOnInit(): void {
    this.ProductService.getAllProductIsTrash().subscribe((res) => {
      this.productList = res;
      this.totalLength = this.productList.length;
    });
  }
  DeleteProductForm(form: NgForm) {
    console.log(form.value);
  }
  toggleProduct() {
    if (confirm('Bạn muốn phục hồi sản phẩm? ')) {
      this.checkedProductList.forEach((e: any) => {
        e.Status = true;
        e.IsDeleted = false;
      });
      this.checkedProductList.forEach((e: Product) => {
        this.ProductService.trashProduct(e).subscribe((res) => {
          this.ProductService.getAllProductIsTrash().subscribe((res) => {
            this.productList = res;
          });
        });
      });
    }
  }
  deleteProduct() {
    if (confirm('Bạn muốn xóa sản phẩm? ')) {
      console.log('Implement delete functionality here');
      this.checkedProductList.forEach((e: Product) => {
        this.ProductService.deleteProduct(e.ProductId).subscribe((res) => {
          console.log(res);
          if (res) {
            this.ImageService.getImage(e.ProductId).subscribe((res) => {
              res.forEach((e: Image) => {
                this.ImageService.deleteImage(e.Id);
              });
            });
          }
        });
        this.ProMapCatService.delete(e.ProductId).subscribe((res) => {
          console.log(res);
        });
      });
      window.location.reload();
    }
  }
  checkUncheckAll() {
    for (var i = 0; i < this.productList.length; i++) {
      this.productList[i].isSelected = this.isMasterSel;
    }

    this.getCheckedItemList();
  }

  isAllSelected() {
    this.isMasterSel = this.productList.every(function (item: any) {
      return item.isSelected == true;
    });

    this.getCheckedItemList();
  }

  getCheckedItemList() {
    this.checkedProductList = [];

    for (var i = 0; i < this.productList.length; i++) {
      if (this.productList[i].isSelected)
        this.checkedProductList.push(this.productList[i]);
    }

    // this.checkedProductList = JSON.stringify(this.checkedProductList);
    console.log(this.checkedProductList);
  }
  addProductName(event: any) {
    const ProductName = event;
    if (ProductName) {
      this.ProductService.getProductByNameTrash(ProductName).subscribe(
        (res) => {
          this.productList = res;
          this.totalLength = this.productList.length;
        }
      );
    } else {
      this.ProductService.getAllProductIsTrash().subscribe((res) => {
        this.productList = res;
        this.totalLength = this.productList.length;
      });
    }
  }
}
