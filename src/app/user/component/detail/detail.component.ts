import { BrandService } from './../../../services/brand.service';
import { CartService } from './../../../services/cart.service';
import { CategoriesService } from './../../../services/categories.service';
import { Product } from '../../../Model/product';
import { ImageService } from './../../../services/image.service';
import { ProductService } from './../../../services/product.service';

import { map } from 'rxjs/operators';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IndexInfo } from 'typescript';

import { Title } from '@angular/platform-browser';

import { Image } from 'src/app/Model/image';
import { Category } from '../../../Model/category';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  quantities = 1;
  desc = true;
  review = false;
  product!: Product;
  images: Image[] = [];
  image!: Image;
  Description: any;
  productList: Product[] = [];
  breadCrumb: Category[] = [];
  length = 0;
  products: any = [];
  grandTotal: number = 0;
  id: number = 0;
  constructor(
    private route: ActivatedRoute,
    private ProductService: ProductService,
    private ImageService: ImageService,
    private titleService: Title,
    private CategoriesService: CategoriesService,
    private CartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.id = this.route.snapshot.params['id'];

    this.ProductService.getProductById(this.id).subscribe((res) => {
      this.product = res;
      this.setTitle(this.product.ProductName);
      Object.assign(this.product, {
        quantity: this.quantities,
        total: this.product.PriceDiscount,
      });
      this.CategoriesService.getBreadCrumb(this.product.CategoryId).subscribe(
        (res) => {
          this.breadCrumb = res;
        }
      );
      this.ProductService.getProductByCatFive(
        this.product.CategoryId
      ).subscribe((res) => {
        this.productList = res;
      });
    });

    this.ImageService.getImage(this.id).subscribe((res) => {
      this.images = res;
      this.image = this.images[0];
    });
  }
  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
  quatitiesMinus() {
    if (this.quantities > 1) this.quantities -= 1;
    Object.assign(this.product, {
      quantity: this.quantities,
      total: this.product.PriceDiscount,
    });
  }
  quatitiesPlus() {
    if (this.quantities < 10) this.quantities += 1;
    Object.assign(this.product, {
      quantity: this.quantities,
      total: this.product.PriceDiscount,
    });
  }
  quatitiesChange(event: number) {
    if (event < 0) {
      this.quantities = 1;
      Object.assign(this.product, {
        quantity: this.quantities,
        total: this.product.PriceDiscount,
      });
    } else if (event > 10) {
      this.quantities = 10;
      Object.assign(this.product, {
        quantity: this.quantities,
        total: this.product.PriceDiscount,
      });
    }
  }
  changeImage(img: any) {
    this.image = img;
  }
  addToCart(item: any) {
    this.CartService.addToCart(item);
    this.CartService.getProducts().subscribe((res) => {
      localStorage.removeItem('product');
      localStorage.setItem('product', JSON.stringify(res));
    });
  }
  somethingChanged() {
    if (this.quantities > 10) {
      this.quantities = 10;
    } else if (this.quantities <= 1) {
      this.quantities = 1;
    }
  }
  ChangeProductName(str: string): string {
    {
      str = str.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
      str = str.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
      str = str.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
      str = str.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
      str = str.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
      str = str.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
      str = str.replace(/đ/gi, 'd');

      str = str.replace(
        /\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi,
        ''
      );

      str = str.replace(/ /gi, '-');

      str = str.replace(/\-\-\-\-\-/gi, '-');
      str = str.replace(/\-\-\-\-/gi, '-');
      str = str.replace(/\-\-\-/gi, '-');
      str = str.replace(/\-\-/gi, '-');

      str = '@' + str + '@';
      str = str.replace(/\@\-|\-\@|\@/gi, '');

      return str;
    }
  }
}
