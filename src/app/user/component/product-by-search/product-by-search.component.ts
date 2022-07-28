import { BrandService } from './../../../services/brand.service';
import { CartService } from './../../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../../Model/category';
import { Product } from '../../../Model/product';
import { ProductService } from './../../../services/product.service';
import { CategoriesService } from './../../../services/categories.service';
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-product-by-search',
  templateUrl: './product-by-search.component.html',
  styleUrls: ['./product-by-search.component.scss'],
})
export class ProductBySearchComponent implements OnInit {
  ListCatId: number[] = [];
  listCat: Category[] = [];
  CatId!: number;
  Percent!: number;
  productList!: Product[];
  selected = 10;
  breadCrumb: Category[] = [];
  ProductName!: string;
  ProductListCheck = true;
  products: any = [];
  grandTotal: number = 0;
  origin: string[] = [];
  brandActive: any[] = [];
  brandIds: number[] = [];
  brands: any[] = [{}];
  originActive: string[] = [];
  sortProduct = '';
  //page
  totalLength: any;
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
    private route: ActivatedRoute,

    private ProductService: ProductService,
    private BrandService: BrandService,
    private router: Router,
    private CartService: CartService,
    private CategoriesService: CategoriesService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.ProductName = this.route.snapshot.params['ProductName'];

    this.ProductService.getProductByName(this.ProductName).subscribe((res) => {
      this.productList = res.filter((item) =>
        item.ProductName.toLowerCase().includes(this.ProductName.toLowerCase())
      );
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
      if (this.productList.length > 0) {
        this.ProductListCheck = false;
      } else {
        this.ProductListCheck = true;
      }

      this.totalLength = this.productList.length;
    });
    this.CategoriesService.getCategoryByParentId(0).subscribe((res) => {
      this.listCat = res;
    });
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

  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
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
        this.ProductService.getProductByName(this.ProductName).subscribe(
          (res) => {
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
            });
          }
        );
      });
    } else if (this.originActive.length > 0) {
      this.productList = [];
      let max = 0;
      let min = 10000000;
      this.originActive.forEach((originRes) => {
        this.ProductService.getProductByName(this.ProductName).subscribe(
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
          }
        );
      });
      this.totalLength = this.productList.length;
    } else {
      if (this.brandActive.length > 0) {
        this.productList = [];
        let max = 0;
        let min = 10000000;
        this.brandActive.forEach((brandRes) => {
          this.ProductService.getProductByName(this.ProductName).subscribe(
            (res) => {
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
        let min = 10000000;
        this.ProductService.getProductByName(this.ProductName).subscribe(
          (res) => {
            this.productList = res.filter((item) =>
              item.ProductName.toLowerCase().includes(
                this.ProductName.toLowerCase()
              )
            );
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

  //checkBrandArray
  checkBrand(item: any) {
    console.log(this.sortProduct);
    if (this.brandActive.includes(item)) {
      this.brandActive.forEach((e, index) => {
        if (e === item) this.brandActive.splice(index, 1);
      });
    } else this.brandActive.push(item);
    if (this.brandActive.length > 0 && this.originActive.length > 0) {
      this.productList = [];
      this.origin = [];
      this.originActive = [];
      let max = 0;
      let min = 10000000;
      this.brandActive.forEach((brandRes) => {
        this.ProductService.getProductByName(this.ProductName).subscribe(
          (res) => {
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
        this.origin = [];
        this.productList = [];
        let max = 0;
        let min = 10000000;
        this.brandActive.forEach((brandRes) => {
          this.ProductService.getProductByName(this.ProductName).subscribe(
            (res) => {
              // .filter((item) =>
              //   item.ProductName.toLowerCase().includes(
              //     this.ProductName.toLowerCase()
              //   )
              // );
              res.forEach((e) => {
                if (e.BrandId === brandRes.BrandId) {
                  this.productList.push(e);
                  if (!this.origin.includes(e.Origin))
                    this.origin.push(e.Origin);
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
        this.productList = [];
        let max = 0;
        let min = 10000000;
        this.ProductService.getProductByName(this.ProductName).subscribe(
          (res) => {
            this.productList = res.filter((item) =>
              item.ProductName.toLowerCase().includes(
                this.ProductName.toLowerCase()
              )
            );
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
  change() {
    if (this.brandActive.length > 0 && this.originActive.length > 0) {
      this.productList = [];
      this.brandActive.forEach((brandRes) => {
        this.ProductService.getProductByName(this.ProductName).subscribe(
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
        this.ProductService.getProductByName(this.ProductName).subscribe(
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
        this.ProductService.getProductByName(this.ProductName).subscribe(
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
      this.ProductService.getProductByName(this.ProductName).subscribe(
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
}
