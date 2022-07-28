import { CartService } from './../../../services/cart.service';
import { CurrencyPipe } from '@angular/common';
import { BrandService } from 'src/app/services/brand.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductService } from 'src/app/services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/Model/category';
import { Product } from 'src/app/Model/product';
import { Title } from '@angular/platform-browser';
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-product-all',
  templateUrl: './product-all.component.html',
  styleUrls: ['./product-all.component.scss'],
})
export class ProductAllComponent implements OnInit {
  listCat: Category[] = [];
  public productList: Product[] = [];
  products: any = [];
  grandTotal: number = 0;
  selected = 10;
  breadCrumb: Category[] = [];
  origin: string[] = [];
  brandActive: any[] = [];
  brandIds: number[] = [];
  brands: any[] = [{}];

  //page

  originActive: string[] = [];
  totalLength: any;
  sortProduct = '';
  page: number = 1;
  //price chose
  minValue: number = 100;
  maxValue: number = 300;
  options: Options = {
    floor: 0,
    ceil: 500,
    translate: (value: number): string => {
      return value + 'đ';
    },
  };
  constructor(
    private router: Router,
    private BrandService: BrandService,
    private ProductService: ProductService,
    private CategoriesService: CategoriesService,
    private CartService: CartService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.ProductService.getProduct().subscribe((res) => {
      this.productList = res;

      this.brands.pop();
      let max = this.productList[0].PriceDiscount;
      let min = this.productList[0].PriceDiscount;
      this.productList.forEach((e, index) => {
        if (max < e.PriceDiscount) {
          max = e.PriceDiscount;
        }
        if (min > e.PriceDiscount) {
          min = e.PriceDiscount;
        }
        if (index === this.productList.length - 1) {
          this.minValue = min;
          this.maxValue = max;
          this.options = {
            floor: min,
            ceil: max,
            translate: (value: number): string => {
              return value.toString() + 'đ';
            },
          };
        }
        if (!this.brandIds.includes(e.BrandId)) {
          this.brandIds.push(e.BrandId);
          this.BrandService.getBrandById(e.BrandId).subscribe((res) => {
            const brannd = {
              BrandId: res.BrandId,
              BrandName: res.BrandName,
            };
            this.brands.push(brannd);
          });
        }

        if (!this.origin.includes(e.Origin)) this.origin.push(e.Origin);
      });

      this.totalLength = this.productList.length;
    });

    this.CategoriesService.getCategoryByParentId(0).subscribe((res) => {
      this.listCat = res;
    });

    this.setTitle('Tất cả sản phẩm');
  }
  checkOrigin(item: any) {
    if (this.originActive.includes(item)) {
      this.originActive.forEach((e, index) => {
        if (e === item) this.originActive.splice(index, 1);
      });
    } else this.originActive.push(item);
    if (this.brandActive.length > 0 && this.originActive.length > 0) {
      this.productList = [];
      let max = 0;
      let min = 10000000;
      this.brandActive.forEach((brandRes) => {
        this.ProductService.getProduct().subscribe((res) => {
          res.forEach((e) => {
            if (
              e.BrandId === brandRes.BrandId &&
              this.originActive.includes(e.Origin)
            ) {
              this.productList.push(e);
              if (max < e.PriceDiscount) {
                max = e.PriceDiscount;
              }
              if (min > e.PriceDiscount) {
                min = e.PriceDiscount;
              }
              this.maxValue = max;
              this.minValue = min;
              this.options = {
                floor: this.minValue,
                ceil: this.maxValue,
                translate: (value: number): string => {
                  return value + 'đ';
                },
              };
            }
            if (this.sortProduct === 'lowToHigh') {
              this.productList = this.productList.sort(
                (a: Product, b: Product) => a.PriceDiscount - b.PriceDiscount
              );
            } else {
              if (this.sortProduct === 'highToLow') {
                this.productList = this.productList.sort(
                  (a: Product, b: Product) => -a.PriceDiscount + b.PriceDiscount
                );
              }
            }
          });
        });
      });
    } else if (this.originActive.length > 0) {
      this.productList = [];
      let max = 0;
      let min = 10000000;
      this.originActive.forEach((originRes) => {
        this.ProductService.getProduct().subscribe((res) => {
          res.forEach((e) => {
            if (e.Origin === originRes) {
              this.productList.push(e);
              if (max < e.PriceDiscount) {
                max = e.PriceDiscount;
              }
              if (min > e.PriceDiscount) {
                min = e.PriceDiscount;
              }
              this.maxValue = max;
              this.minValue = min;
              this.options = {
                floor: this.minValue,
                ceil: this.maxValue,
                translate: (value: number): string => {
                  return value + 'đ';
                },
              };
              if (this.sortProduct === 'lowToHigh') {
                this.productList = this.productList.sort(
                  (a: Product, b: Product) => a.PriceDiscount - b.PriceDiscount
                );
              } else {
                if (this.sortProduct === 'highToLow') {
                  this.productList = this.productList.sort(
                    (a: Product, b: Product) =>
                      -a.PriceDiscount + b.PriceDiscount
                  );
                }
              }
            }
          });
        });
      });
      this.totalLength = this.productList.length;
    } else {
      if (this.brandActive.length > 0) {
        this.productList = [];
        let max = 0;
        let min = 10000000;
        this.brandActive.forEach((brandRes) => {
          this.ProductService.getProduct().subscribe((res) => {
            res.forEach((e) => {
              if (e.BrandId === brandRes.BrandId) {
                this.productList.push(e);
                if (!this.origin.includes(e.Origin)) {
                  this.origin.push(e.Origin);
                }
                if (max < e.PriceDiscount) {
                  max = e.PriceDiscount;
                }
                if (min > e.PriceDiscount) {
                  min = e.PriceDiscount;
                }
                this.maxValue = max;
                this.minValue = min;
                this.options = {
                  floor: this.minValue,
                  ceil: this.maxValue,
                  translate: (value: number): string => {
                    return value + 'đ';
                  },
                };
              }

              if (this.sortProduct === 'lowToHigh') {
                this.productList = this.productList.sort(
                  (a: Product, b: Product) => a.PriceDiscount - b.PriceDiscount
                );
              } else {
                if (this.sortProduct === 'highToLow') {
                  this.productList = this.productList.sort(
                    (a: Product, b: Product) =>
                      -a.PriceDiscount + b.PriceDiscount
                  );
                }
              }
            });
          });
        });
        this.totalLength = this.productList.length;
      } else {
        this.productList = [];
        let max = 0;
        let min = 10000000;
        this.ProductService.getProduct().subscribe((res) => {
          this.productList = res;
          this.productList.forEach((e) => {
            if (max < e.PriceDiscount) {
              max = e.PriceDiscount;
            }
            if (min > e.PriceDiscount) {
              min = e.PriceDiscount;
            }
            this.maxValue = max;
            this.minValue = min;
            this.options = {
              floor: this.minValue,
              ceil: this.maxValue,
              translate: (value: number): string => {
                return value + 'đ';
              },
            };
          });

          this.totalLength = this.productList.length;
        });
        if (this.sortProduct === 'lowToHigh') {
          this.productList = this.productList.sort(
            (a: Product, b: Product) => a.PriceDiscount - b.PriceDiscount
          );
        } else {
          if (this.sortProduct === 'highToLow') {
            this.productList = this.productList.sort(
              (a: Product, b: Product) => -a.PriceDiscount + b.PriceDiscount
            );
          }
        }
      }
    }
  }

  //checkBrandArray
  checkBrand(item: any) {
    if (this.brandActive.includes(item)) {
      this.brandActive.forEach((e, index) => {
        if (e === item) this.brandActive.splice(index, 1);
      });
    } else this.brandActive.push(item);
    if (this.brandActive.length > 0 && this.originActive.length > 0) {
      let max = 0;
      let min = 10000000;
      this.productList = [];
      this.origin = [];
      this.originActive = [];
      this.brandActive.forEach((brandRes) => {
        this.ProductService.getProduct().subscribe((res) => {
          res.forEach((e) => {
            if (e.BrandId === brandRes.BrandId) {
              this.productList.push(e);

              if (!this.origin.includes(e.Origin)) this.origin.push(e.Origin);
              if (max < e.PriceDiscount) {
                max = e.PriceDiscount;
              }
              if (min > e.PriceDiscount) {
                min = e.PriceDiscount;
              }
              this.maxValue = max;
              this.minValue = min;
              this.options = {
                floor: this.minValue,
                ceil: this.maxValue,
                translate: (value: number): string => {
                  return value + 'đ';
                },
              };
            }
            if (this.sortProduct === 'lowToHigh') {
              this.productList = this.productList.sort(
                (a: Product, b: Product) => a.PriceDiscount - b.PriceDiscount
              );
            } else {
              if (this.sortProduct === 'highToLow') {
                this.productList = this.productList.sort(
                  (a: Product, b: Product) => -a.PriceDiscount + b.PriceDiscount
                );
              }
            }
          });
        });
      });
      this.totalLength = this.productList.length;
    } else {
      if (this.brandActive.length > 0) {
        let max = 0;
        let min = 10000000;
        this.origin = [];
        this.productList = [];
        this.brandActive.forEach((brandRes) => {
          this.ProductService.getProduct().subscribe((res) => {
            res.forEach((e) => {
              if (e.BrandId === brandRes.BrandId) {
                this.productList.push(e);
                if (!this.origin.includes(e.Origin)) this.origin.push(e.Origin);
                if (max < e.PriceDiscount) {
                  max = e.PriceDiscount;
                }
                if (min > e.PriceDiscount) {
                  min = e.PriceDiscount;
                }
                this.maxValue = max;
                this.minValue = min;
                this.options = {
                  floor: this.minValue,
                  ceil: this.maxValue,
                  translate: (value: number): string => {
                    return value + 'đ';
                  },
                };
              }
              if (this.sortProduct === 'lowToHigh') {
                this.productList = this.productList.sort(
                  (a: Product, b: Product) => a.PriceDiscount - b.PriceDiscount
                );
              } else {
                if (this.sortProduct === 'highToLow') {
                  this.productList = this.productList.sort(
                    (a: Product, b: Product) =>
                      -a.PriceDiscount + b.PriceDiscount
                  );
                }
              }
            });
          });
        });
        this.totalLength = this.productList.length;
      } else {
        this.productList = [];
        let max = 0;
        let min = 10000000;
        this.ProductService.getProduct().subscribe((res) => {
          this.productList = res;

          this.productList.forEach((e) => {
            if (!this.origin.includes(e.Origin)) this.origin.push(e.Origin);
            if (max < e.PriceDiscount) {
              max = e.PriceDiscount;
            }
            if (min > e.PriceDiscount) {
              min = e.PriceDiscount;
            }
            this.maxValue = max;
            this.minValue = min;
            this.options = {
              floor: this.minValue,
              ceil: this.maxValue,
              translate: (value: number): string => {
                return value + 'đ';
              },
            };
          });

          this.totalLength = this.productList.length;
        });
        if (this.sortProduct === 'lowToHigh') {
          this.productList = this.productList.sort(
            (a: Product, b: Product) => a.PriceDiscount - b.PriceDiscount
          );
        } else {
          if (this.sortProduct === 'highToLow') {
            this.productList = this.productList.sort(
              (a: Product, b: Product) => -a.PriceDiscount + b.PriceDiscount
            );
          }
        }
      }
    }
  }

  //chose value hide
  onChangeHidden(event: any) {
    this.selected = event.target.value;
  }

  //fileter sort
  onChangeOption(event: any) {
    console.log(event.target.value);

    if (event.target.value === 'lowToHigh') {
      this.productList = this.productList.sort(
        (a: Product, b: Product) => a.PriceDiscount - b.PriceDiscount
      );
    } else {
      if (event.target.value === 'highToLow') {
        this.productList = this.productList.sort(
          (a: Product, b: Product) => -a.PriceDiscount + b.PriceDiscount
        );
      }
    }
  }
  change() {
    if (this.brandActive.length > 0 && this.originActive.length > 0) {
      this.productList = [];
      this.brandActive.forEach((brandRes) => {
        this.ProductService.getProduct().subscribe((res) => {
          res.forEach((e) => {
            if (
              e.BrandId === brandRes.BrandId &&
              this.originActive.includes(e.Origin) &&
              e.PriceDiscount >= this.minValue &&
              e.PriceDiscount <= this.maxValue
            ) {
              this.productList.push(e);
            }
          });
        });
      });
    } else if (this.brandActive.length > 0) {
      this.origin = [];
      this.productList = [];
      this.brandActive.forEach((brandRes) => {
        this.ProductService.getProduct().subscribe((res) => {
          res.forEach((e) => {
            if (
              e.BrandId === brandRes.BrandId &&
              e.PriceDiscount >= this.minValue &&
              e.PriceDiscount <= this.maxValue
            ) {
              this.productList.push(e);
              if (!this.origin.includes(e.Origin)) this.origin.push(e.Origin);
            }
            if (this.sortProduct === 'lowToHigh') {
              this.productList = this.productList.sort(
                (a: Product, b: Product) => a.PriceDiscount - b.PriceDiscount
              );
            } else {
              if (this.sortProduct === 'highToLow') {
                this.productList = this.productList.sort(
                  (a: Product, b: Product) => -a.PriceDiscount + b.PriceDiscount
                );
              }
            }
          });
        });
      });
      this.totalLength = this.productList.length;
    } else if (this.originActive.length > 0) {
      this.productList = [];

      this.originActive.forEach((originRes) => {
        this.ProductService.getProduct().subscribe((res) => {
          res.forEach((e) => {
            if (
              e.Origin === originRes &&
              e.PriceDiscount >= this.minValue &&
              e.PriceDiscount <= this.maxValue
            ) {
              this.productList.push(e);

              if (this.sortProduct === 'lowToHigh') {
                this.productList = this.productList.sort(
                  (a: Product, b: Product) => a.PriceDiscount - b.PriceDiscount
                );
              } else {
                if (this.sortProduct === 'highToLow') {
                  this.productList = this.productList.sort(
                    (a: Product, b: Product) =>
                      -a.PriceDiscount + b.PriceDiscount
                  );
                }
              }
            }
          });
        });
      });
      this.totalLength = this.productList.length;
    } else {
      this.productList = [];
      this.ProductService.getProduct().subscribe((res) => {
        res.forEach((e) => {
          if (
            e.PriceDiscount >= this.minValue &&
            e.PriceDiscount <= this.maxValue
          ) {
            this.productList.push(e);

            if (this.sortProduct === 'lowToHigh') {
              this.productList = this.productList.sort(
                (a: Product, b: Product) => a.PriceDiscount - b.PriceDiscount
              );
            } else {
              if (this.sortProduct === 'highToLow') {
                this.productList = this.productList.sort(
                  (a: Product, b: Product) => -a.PriceDiscount + b.PriceDiscount
                );
              }
            }
          }
        });

        this.totalLength = this.productList.length;
      });
    }
  }

  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
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

      str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '');
      str = str.replace(/\u02C6|\u0306|\u031B/g, '');
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
