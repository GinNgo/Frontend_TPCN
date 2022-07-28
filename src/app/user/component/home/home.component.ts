import { CartService } from './../../../services/cart.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Category } from '../../../Model/category';
import { CategoriesService } from './../../../services/categories.service';
import { SlideService } from './../../../services/slide.service';
import { ProductService } from './../../../services/product.service';

import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Model/product';
import { Slide } from '../../../Model/slide';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public productList: Product[] = [];
  public productFiveItem: Product[] = [];
  public productListByPercent: Product[] = [];
  public productRandom: Product[] = [];
  public slideList: Slide[] = [];
  public categoryList: Category[] = [];
  products: any = [];
  grandTotal: number = 0;
  public Percent = 20;

  constructor(
    private ProductService: ProductService,
    private SlideService: SlideService,
    private CategoriesService: CategoriesService,
    private CartService: CartService,
    private titleService: Title,
    private jwtHelper: JwtHelperService
  ) {}

  ngOnInit(): void {
    //get all product
    this.titleService.setTitle('WebsiteBanTPCN');
    if (this.ProductService.getProduct() == undefined) {
      return;
    } else {
      this.ProductService.getProduct().subscribe((res) => {
        this.productList = res;
      });
    }
    //get 5 product for productnew
    if (this.ProductService.getFiveProduct() == undefined) {
      return;
    } else {
      this.ProductService.getFiveProduct().subscribe((res) => {
        this.productFiveItem = res;
      });
    }
    //get 5 product for random
    if (this.ProductService.getProductRandom() == undefined) {
      return;
    } else {
      this.ProductService.getProductRandom().subscribe((res) => {
        this.productRandom = res;
      });
    }
    //get 5 product for percent
    this.ProductService.getProductByPercentHome(this.Percent).subscribe(
      (res) => {
        this.productListByPercent = res;
      }
    );
    //------------------
    this.SlideService.getSlide().subscribe((res) => {
      this.slideList = res;
    });
    this.CategoriesService.getCat().subscribe((res) => {
      this.categoryList = res;
    });
    //-------------
  }
  isUserAuthenticated() {
    const token = localStorage.getItem('jwt');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    } else {
      return false;
    }
  }
  addToCart(item: Product) {
    Object.assign(item, {
      quantity: 1,
      total: item.PriceDiscount,
    });
    this.CartService.addToCart(item);
    this.CartService.getProducts().subscribe((res) => {
      localStorage.removeItem('product');
      localStorage.setItem('product', JSON.stringify(res));
    });
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
