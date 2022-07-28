import { Brand } from 'src/app/Model/brand';
import { BrandService } from 'src/app/services/brand.service';
import { NgForm } from '@angular/forms';
import { Product, ProductExport } from './../../../../Model/product';
import { ProductService } from './../../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { ngxCsv } from 'ngx-csv/ngx-csv';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  productList: Product[] = [];
  brand: string[] = [];
  //page
  List: Array<ProductExport> = [];
  totalLength: any;
  page: number = 1;
  isMasterSel = false;
  checkedProductList: any;
  constructor(
    private ProductService: ProductService,
    private BrandService: BrandService
  ) {}

  ngOnInit(): void {
    this.ProductService.getProductDashboard().subscribe((res) => {
      this.productList = res;

      this.productList.forEach((e) => {
        this.BrandService.getBrandById(e.BrandId).subscribe((resBrand) => {
          var x = {
            ProductId: e.ProductId,
            ProductName: e.ProductName,
            ShortDesc: e.ShortDesc,
            Image: e.Image,
            Price: e.Price,
            PriceDiscount: e.PriceDiscount,
            BrandName: resBrand.BrandName,
            Origin: e.Origin,
            Status: e.Status,
          };
          this.List.push(x);
          this.brand.push(resBrand.BrandName);
        });
      });

      this.totalLength = this.productList.length;
    });
  }

  DeleteProduct() {
    if (confirm('Bạn muốn xóa tạm thời? ')) {
      console.log('Implement delete functionality here');
      this.checkedProductList.forEach((e: any) => {
        e.Status = false;
        e.IsDeleted = true;
      });
      this.checkedProductList.forEach((e: Product) => {
        this.ProductService.trashProduct(e).subscribe((res) => {
          this.ProductService.getProductDashboard().subscribe((res) => {
            this.productList = res;
            this.productList.forEach((e) => {
              this.BrandService.getBrandById(e.BrandId).subscribe(
                (resBrand) => {
                  this.brand.push(resBrand.BrandName);
                }
              );
            });
            this.totalLength = this.productList.length;
          });
        });
      });
    }
  }

  TogglleStatus() {
    if (confirm('Bạn muốn chuyển đổi trạng thái sản phẩm? ')) {
      this.checkedProductList.forEach((e: any) => {
        e.Status = !e.Status;
      });
      this.checkedProductList.forEach((e: Product) => {
        this.ProductService.trashProduct(e).subscribe((res) => {
          console.log(res);
        });
      });
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
    console.log(this.checkedProductList);
    // this.checkedProductList = JSON.stringify(this.checkedProductList);
  }

  addProductName(event: any) {
    const ProductName = event;

    if (ProductName) {
      this.ProductService.getProductByName(ProductName).subscribe((res) => {
        this.productList = res;
        this.totalLength = this.productList.length;
      });
    } else {
      this.ProductService.getProduct().subscribe((res) => {
        this.productList = res;
        this.totalLength = this.productList.length;
      });
    }
  }
  FileDownload() {
    var options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Dữ liệu sản phẩm',
      useBom: true,

      headers: [
        'Mã sản phẩm',
        'Tên sản phẩm',
        'Mô tả ngắn',
        'Hình ảnh',
        'Giá',
        'Giá giảm',
        'Tên thương hiệu',
        'Xuất xứ',
        'Trạng thái bán',
      ],
    };

    new ngxCsv(this.List, 'Du lieu san pham', options);
  }
}
