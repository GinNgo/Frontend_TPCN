import { BrandService } from 'src/app/services/brand.service';
import { CartService } from './../../../services/cart.service';
import { Category } from '../../../Model/category';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../Model/product';
import { ProductService } from './../../../services/product.service';
import { CategoriesService } from './../../../services/categories.service';
import { Title } from '@angular/platform-browser';
import { endWith } from 'rxjs';
import { Options } from '@angular-slider/ngx-slider';
@Component({
  selector: 'app-product-by-cat',
  templateUrl: './product-by-cat.component.html',
  styleUrls: ['./product-by-cat.component.scss'],
})
export class ProductByCatComponent implements OnInit {
  ListCatId: number[] = [];
  CatId!: number;
  listCat: Category[] = [];
  public productList: Product[] = [];
  products: any = [];

  grandTotal: number = 0;
  selected = 10;
  breadCrumb: Category[] = [];
  brandActive: any[] = [];
  brandIds: number[] = [];
  brands: any[] = [{}];
  origin: string[] = [];

  //page
  originActive: any[] = [];

  totalLength: any;
  sortProduct = '';
  page: number = 1; //price chose
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
    private router: Router,
    private route: ActivatedRoute,
    private ProductService: ProductService,
    private CategoriesService: CategoriesService,
    private CartService: CartService,
    private BrandService: BrandService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.CatId = this.route.snapshot.params['CatId'];

    this.productList = [];
    this.brands = [];

    this.CategoriesService.getIdCatForProduct(this.CatId).subscribe(
      (resCat) => {
        let max = 0;
        let min = 100000000;
        this.ListCatId = resCat;

        resCat.forEach((e, i) => {
          this.ProductService.getProductByCat(e).subscribe((res) => {
            res.forEach((k) => {
              this.productList.push(k);
              console.log(this.productList);
              if (max < k.PriceDiscount) {
                max = k.PriceDiscount;
              }
              if (min > k.PriceDiscount) {
                min = k.PriceDiscount;
              }
              if (i === resCat.length - 1) {
                this.minValue = this.maxValue;
              }
              this.options = {
                floor: min,
                ceil: max,
                translate: (value: number): string => {
                  return value + 'đ';
                },
              };
              if (!this.brandIds.includes(k.BrandId)) {
                this.brandIds.push(k.BrandId);
                this.BrandService.getBrandById(k.BrandId).subscribe((res) => {
                  const brannd = {
                    BrandId: res.BrandId,
                    BrandName: res.BrandName,
                  };
                  if (!this.brands.includes(brannd)) this.brands.push(brannd);
                });
              }
              if (!this.origin.includes(k.Origin)) this.origin.push(k.Origin);
            });
          });
        });

        this.totalLength = this.productList.length;
      }
    );

    this.CategoriesService.getBreadCrumb(this.CatId).subscribe((res) => {
      this.breadCrumb = res;
      this.setTitle(this.breadCrumb[this.breadCrumb.length - 1].CatName);
    });
    this.CategoriesService.getCategoryByParentId(this.CatId).subscribe(
      (res) => {
        this.listCat = res;
      }
    );
  }
  onChangeHidden(event: any) {
    this.selected = event.target.value;
    console.log(this.selected);
  }
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
  checkBrand(item: any) {
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
        this.ListCatId.forEach((e, i) => {
          this.ProductService.getProductByCat(e).subscribe((res) => {
            res.forEach((e, index) => {
              if (e.BrandId === brandRes.BrandId) {
                this.productList.push(e);
                if (max < e.PriceDiscount) {
                  max = e.PriceDiscount;
                }
                if (min > e.PriceDiscount) {
                  min = e.PriceDiscount;
                }

                this.minValue = min;
                this.maxValue = max;
                this.options = {
                  floor: min,
                  ceil: max,
                  translate: (value: number): string => {
                    return value.toString() + 'đ';
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
          });
        });
      });
      this.totalLength = this.productList.length;
    } else {
      if (this.brandActive.length > 0) {
        this.origin = [];
        this.productList = [];
        let max = 0;
        let min = 10000000;
        this.brandActive.forEach((brandRes) => {
          this.ListCatId.forEach((e, i) => {
            this.ProductService.getProductByCat(e).subscribe((res) => {
              res.forEach((e, index) => {
                if (e.BrandId === brandRes.BrandId) {
                  this.productList.push(e);
                  if (max < e.PriceDiscount) {
                    max = e.PriceDiscount;
                  }
                  if (min > e.PriceDiscount) {
                    min = e.PriceDiscount;
                  }
                  if (i === this.ListCatId.length - 1) {
                    this.minValue = min;
                    this.maxValue = this.minValue;
                  }
                  this.options = {
                    floor: min,
                    ceil: max,
                    translate: (value: number): string => {
                      return value.toString() + 'đ';
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
            });
          });
        });
        this.totalLength = this.productList.length;
      } else {
        this.brandActive = [];
        this.productList = [];
        let max = 0;
        let min = 10000000;

        this.ListCatId.forEach((e, i) => {
          this.ProductService.getProductByCat(e).subscribe((res) => {
            res.forEach((k) => {
              this.productList.push(k);
              if (max < k.PriceDiscount) {
                max = k.PriceDiscount;
              }
              if (min > k.PriceDiscount) {
                min = k.PriceDiscount;
              }
              if (i === this.ListCatId.length - 1) {
                this.maxValue = this.minValue;
              }
              this.options = {
                floor: min,
                ceil: max,
                translate: (value: number): string => {
                  return value.toString() + 'đ';
                },
              };
              if (!this.brandIds.includes(k.BrandId)) {
                this.brandIds.push(k.BrandId);
                this.BrandService.getBrandById(k.BrandId).subscribe((res) => {
                  const brannd = {
                    BrandId: res.BrandId,
                    BrandName: res.BrandName,
                  };
                  if (!this.brands.includes(brannd)) this.brands.push(brannd);
                });
              }
              if (!this.origin.includes(k.Origin)) this.origin.push(k.Origin);
            });
          });
        });

        this.totalLength = this.productList.length;

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
        this.ListCatId.forEach((e, i) => {
          this.ProductService.getProductByCat(e).subscribe((res) => {
            res.forEach((e, index) => {
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
            });
          });
        });
      });
    } else if (this.originActive.length > 0) {
      this.productList = [];
      let max = 0;
      let min = 10000000;
      this.originActive.forEach((originRes) => {
        this.ListCatId.forEach((e, i) => {
          this.ProductService.getProductByCat(e).subscribe((res) => {
            res.forEach((k, index) => {
              if (k.Origin === originRes) {
                this.productList.push(k);
                if (max < k.PriceDiscount) {
                  max = k.PriceDiscount;
                }
                if (min > k.PriceDiscount) {
                  min = k.PriceDiscount;
                }
                if (i === this.ListCatId.length - 1) {
                  this.minValue = min;
                  this.maxValue = this.minValue;
                }

                this.options = {
                  floor: min,
                  ceil: max,
                  translate: (value: number): string => {
                    return value.toString() + 'đ';
                  },
                };

                if (!this.origin.includes(k.Origin)) this.origin.push(k.Origin);
              }
            });
          });
        });

        this.totalLength = this.productList.length;
      });
    } else if (this.brandActive.length > 0) {
      this.productList = [];
      let max = 0;
      let min = 10000000;
      this.brandActive.forEach((brandRes) => {
        this.ListCatId.forEach((e, i) => {
          this.ProductService.getProductByCat(e).subscribe((res) => {
            res.forEach((e, index) => {
              if (e.BrandId === brandRes.BrandId) {
                this.productList.push(e);
                if (max < e.PriceDiscount) {
                  max = e.PriceDiscount;
                }
                if (min > e.PriceDiscount) {
                  min = e.PriceDiscount;
                }

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
              if (!this.origin.includes(e.Origin)) {
                this.origin.push(e.Origin);
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
      });
      this.totalLength = this.productList.length;
    } else {
      this.productList = [];
      let max = 0;
      let min = 10000000;

      this.ListCatId.forEach((e, i) => {
        this.ProductService.getProductByCat(e).subscribe((res) => {
          res.forEach((k, index) => {
            this.productList.push(k);
            if (max < k.PriceDiscount) {
              max = k.PriceDiscount;
            }
            if (min > k.PriceDiscount) {
              min = k.PriceDiscount;
            }
            if (i === this.ListCatId.length - 1) {
              this.minValue = min;
              this.maxValue = this.minValue;
            }

            this.options = {
              floor: min,
              ceil: max,
              translate: (value: number): string => {
                return value.toString() + 'đ';
              },
            };

            if (!this.origin.includes(k.Origin)) this.origin.push(k.Origin);
          });
        });
      });

      this.totalLength = this.productList.length;
    }
  }

  change() {
    if (this.brandActive.length > 0 && this.originActive.length > 0) {
      this.productList = [];
      this.brandActive.forEach((brandRes) => {
        this.ListCatId.forEach((e) => {
          this.ProductService.getProductByCat(e).subscribe((res) => {
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
      });
    } else if (this.brandActive.length > 0) {
      this.origin = [];
      this.productList = [];
      this.brandActive.forEach((brandRes) => {
        this.ListCatId.forEach((e) => {
          this.ProductService.getProductByCat(e).subscribe((res) => {
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
          });
        });
      });
      this.totalLength = this.productList.length;
    } else if (this.originActive.length > 0) {
      this.productList = [];

      this.originActive.forEach((originRes) => {
        this.ListCatId.forEach((e) => {
          this.ProductService.getProductByCat(e).subscribe((res) => {
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
          });
        });
      });
      this.totalLength = this.productList.length;
    } else {
      this.productList = [];
      this.ListCatId.forEach((e) => {
        this.ProductService.getProductByCat(e).subscribe((res) => {
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
        });
      });
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
