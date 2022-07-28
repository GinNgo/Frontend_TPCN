import { Title } from '@angular/platform-browser';
import { BrandService } from './../../../services/brand.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { CartService } from './../../../services/cart.service';
import { ProductService } from './../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../Model/product';
import { Category } from 'src/app/Model/category';
import { Options } from '@angular-slider/ngx-slider';
@Component({
  selector: 'app-product-by-price',
  templateUrl: './product-by-price.component.html',
  styleUrls: ['./product-by-price.component.scss'],
})
export class ProductByPriceComponent implements OnInit {
  Percent!: number;
  public productList: Product[] = [];
  selected = 10;
  products: any = [];
  grandTotal: number = 0;
  listCat: Category[] = [];
  origin: string[] = [];
  isValidOrigin = true;
  originActive: string[] = [];
  brandActive: any[] = [];
  brandIds: number[] = [];
  brands: any[] = [{}];
  //page
  totalLength: any;
  sortProduct = '';
  page: number = 1;
  minValue: number = 100000000;
  maxValue: number = 0;
  options: Options = {
    floor: 0,
    ceil: 500,
    translate: (value: number): string => {
      return value + 'đ';
    },
  };
  constructor(
    private route: ActivatedRoute,
    private CartService: CartService,
    private BrandService: BrandService,
    private ProductService: ProductService,
    private CategoriesService: CategoriesService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Sản phẩm giảm giá');
    this.Percent = this.route.snapshot.params['Percent'];
    let max = 0;
    let min = 100000000;
    this.ProductService.getProductByPercentAll(this.Percent).subscribe(
      (res) => {
        this.productList = res;
        this.brands.pop();

        this.productList.forEach((e) => {
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
          if (!this.origin.includes(e.Origin)) this.origin.push(e.Origin);
        });

        if (this.origin.length <= 0) {
          this.isValidOrigin = false;
        }
        this.totalLength = this.productList.length;
      }
    );
    this.CategoriesService.getCategoryByParentId(0).subscribe((res) => {
      this.listCat = res;
    });
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
  checkBrand(item: any) {
    if (this.brandActive.includes(item)) {
      this.brandActive.forEach((e, index) => {
        if (e === item) this.brandActive.splice(index, 1);
      });
    } else this.brandActive.push(item);
    if (this.brandActive.length > 0 && this.originActive.length > 0) {
      let max = 0;
      let min = 100000000;
      this.productList = [];
      this.origin = [];
      this.originActive = [];
      this.brandActive.forEach((brandRes) => {
        this.ProductService.getProductByPercentAll(this.Percent).subscribe(
          (res) => {
            res.forEach((e) => {
              if (e.BrandId === brandRes.BrandId) {
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
                if (!this.origin.includes(e.Origin)) this.origin.push(e.Origin);
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
          }
        );
      });
      this.totalLength = this.productList.length;
    } else {
      if (this.brandActive.length > 0) {
        let max = 0;
        let min = 100000000;
        this.origin = [];
        this.productList = [];
        this.brandActive.forEach((brandRes) => {
          this.ProductService.getProductByPercentAll(this.Percent).subscribe(
            (res) => {
              res.forEach((e) => {
                if (e.BrandId === brandRes.BrandId) {
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
                  if (!this.origin.includes(e.Origin))
                    this.origin.push(e.Origin);
                }
                if (this.sortProduct === 'lowToHigh') {
                  this.productList = this.productList.sort(
                    (a: Product, b: Product) =>
                      a.PriceDiscount - b.PriceDiscount
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
            }
          );
        });
        this.totalLength = this.productList.length;
      } else {
        let max = 0;
        let min = 100000000;
        this.productList = [];
        this.origin = [];
        this.ProductService.getProductByPercentAll(this.Percent).subscribe(
          (res) => {
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
              if (!this.origin.includes(e.Origin)) this.origin.push(e.Origin);
            });

            this.totalLength = this.productList.length;
          }
        );
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
  checkOrigin(item: any) {
    if (this.originActive.includes(item)) {
      this.originActive.forEach((e, index) => {
        if (e === item) this.originActive.splice(index, 1);
      });
    } else this.originActive.push(item);
    if (this.brandActive.length > 0 && this.originActive.length > 0) {
      let max = 0;
      let min = 100000000;
      this.productList = [];
      this.brandActive.forEach((brandRes) => {
        this.ProductService.getProductByPercentAll(this.Percent).subscribe(
          (res) => {
            res.forEach((e) => {
              if (
                e.BrandId === brandRes.BrandId &&
                this.originActive.includes(e.Origin)
              ) {
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
                this.productList.push(e);
              }
            });
          }
        );
      });
    } else if (this.originActive.length > 0) {
      this.productList = [];
      let max = 0;
      let min = 100000000;
      this.originActive.forEach((originRes) => {
        this.ProductService.getProductByPercentAll(this.Percent).subscribe(
          (res) => {
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
                if (!this.origin.includes(e.Origin)) this.origin.push(e.Origin);
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

            this.totalLength = this.productList.length;
          }
        );
      });
    } else {
      if (this.brandActive.length > 0) {
        this.productList = [];
        let max = 0;
        let min = 100000000;
        this.brandActive.forEach((brandRes) => {
          this.ProductService.getProductByPercentAll(this.Percent).subscribe(
            (res) => {
              res.forEach((e) => {
                if (e.BrandId === brandRes.BrandId) {
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
                  if (!this.origin.includes(e.Origin)) {
                    this.origin.push(e.Origin);
                  }
                }

                if (this.sortProduct === 'lowToHigh') {
                  this.productList = this.productList.sort(
                    (a: Product, b: Product) =>
                      a.PriceDiscount - b.PriceDiscount
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
            }
          );
        });
        this.totalLength = this.productList.length;
      } else {
        this.productList = [];
        let max = 0;
        let min = 100000000;
        this.ProductService.getProductByPercentAll(this.Percent).subscribe(
          (res) => {
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
          }
        );
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
  onChangeOption(event: any) {
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
  onChangeHidden(event: any) {
    this.selected = event.target.value;
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
  change() {
    if (this.brandActive.length > 0 && this.originActive.length > 0) {
      this.productList = [];
      this.brandActive.forEach((brandRes) => {
        this.ProductService.getProductByPercentAll(this.Percent).subscribe(
          (res) => {
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
          }
        );
      });
    } else if (this.brandActive.length > 0) {
      this.origin = [];
      this.productList = [];
      this.brandActive.forEach((brandRes) => {
        this.ProductService.getProductByPercentAll(this.Percent).subscribe(
          (res) => {
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
                    (a: Product, b: Product) =>
                      -a.PriceDiscount + b.PriceDiscount
                  );
                }
              }
            });
          }
        );
      });
      this.totalLength = this.productList.length;
    } else if (this.originActive.length > 0) {
      this.productList = [];

      this.originActive.forEach((originRes) => {
        this.ProductService.getProductByPercentAll(this.Percent).subscribe(
          (res) => {
            res.forEach((e) => {
              if (
                e.Origin === originRes &&
                e.PriceDiscount >= this.minValue &&
                e.PriceDiscount <= this.maxValue
              ) {
                this.productList.push(e);

                if (this.sortProduct === 'lowToHigh') {
                  this.productList = this.productList.sort(
                    (a: Product, b: Product) =>
                      a.PriceDiscount - b.PriceDiscount
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
          }
        );
      });
      this.totalLength = this.productList.length;
    } else {
      this.productList = [];
      this.ProductService.getProductByPercentAll(this.Percent).subscribe(
        (res) => {
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
                    (a: Product, b: Product) =>
                      -a.PriceDiscount + b.PriceDiscount
                  );
                }
              }
            }
          });

          this.totalLength = this.productList.length;
        }
      );
    }
  }
}
