import { ProMapCatService } from './../../../../services/ProMapCat.service';
import { ProMapCat } from './../../../../Model/ProMapCat';
import { Image } from 'src/app/Model/image';
import { ImageService } from './../../../../services/image.service';
import { BrandService } from './../../../../services/brand.service';
import { Brand } from './../../../../Model/brand';
import { Category } from './../../../../Model/category';
import { CategoriesService } from './../../../../services/categories.service';
import { Product } from './../../../../Model/product';

import { ProductService } from './../../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
})
export class ProductEditComponent implements OnInit {
  status = [
    {
      id: true,
      value: 'Còn bán',
    },
    {
      id: false,
      value: 'Ngưng bán',
    },
  ];
  Product!: Product;
  ImageList: Image[] = [];
  catList: Category[] = [];

  brandList: Brand[] = [];
  dropdownList = [{}];
  selectedItems = [];
  ProMap: any = [];
  dropdownSettings: IDropdownSettings = {};
  editImage = false;
  Image!: Image;
  id = 0;
  url = 'https://localhost:44376/Upload/images/default-image_100.png';
  url1: string = 'https://localhost:44376/Upload/images/';
  constructor(
    private ProductService: ProductService,
    private CategoriesService: CategoriesService,
    private BrandService: BrandService,
    private route: ActivatedRoute,
    private router: Router,
    private ImageService: ImageService,
    private ProMapCatService: ProMapCatService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['productId'];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'CatId',
      textField: 'CatName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true,
    };

    this.ProductService.getProductById(this.id).subscribe((res) => {
      this.Product = res;
      this.url1 = this.url1 + this.Product.Image;
    });
    this.CategoriesService.getCatAddProduct().subscribe((res) => {
      this.catList = res;
      this.dropdownList = res;
      let tmp: any = [{}];
      this.ProMapCatService.get(this.Product?.ProductId).subscribe((resCat) => {
        // console.log(resCat);
        tmp.pop();
        resCat.forEach((e) => {
          this.catList.forEach((element) => {
            if (element.CatId === e.CategoryId) {
              tmp.push({
                CatId: element.CatId,
                CatName: element.CatName,
              });
            }
          });
        });
        this.selectedItems = tmp;
      });
    });

    this.BrandService.getBrand().subscribe((res) => {
      this.brandList = res;
    });
    this.ImageService.getImage(this.id).subscribe((res) => {
      this.ImageList = res;
    });
  }

  UpdateImage(item: Image, displayorder: string) {
    item.DisplayOrder = Number(displayorder);
    // console.log(item);
    this.ImageService.updateImage(item).subscribe((res) => {});
  }

  EditProductForm(form: NgForm) {
    var urlImage = form.value.file;
    if (urlImage) {
      var filename = urlImage.substring(urlImage.lastIndexOf('\\') + 1);
    } else {
      filename = this.Product.Image;
    }
    let cat: any[] = this.selectedItems;
    let product = {
      ProductId: this.Product.ProductId,
      ProductName: form.value.name,
      ShortDesc: form.value.description,
      FullDesc: form.value.fullDescription,
      Price: form.value.price,
      PriceDiscount: form.value.priceDiscount,
      Image: filename,
      BrandId: form.value.brand,
      Origin: form.value.origin,
      CategoryId: cat[0].CatId,
      Status: form.value.status,
      IsDeleted: false,
    };
    // console.log(cat);
    if (confirm('Bạn muốn cập nhật sản phẩm? ')) {
      this.ProductService.editProduct(product).subscribe((res) => {
        if (res == true) {
          this.ProMapCatService.delete(product.ProductId).subscribe(
            (res) => {}
          );
          let Map: Category[] = this.selectedItems;

          for (let i = 0; i < Map.length; i++) {
            var proMap = {
              CategoryId: Map[i].CatId,
              ProductId: product.ProductId,
            };

            this.ProMapCatService.create(proMap).subscribe((res) => {});
          }

          this.ProductService.getProductById(this.id).subscribe((res) => {
            this.Product = res;
            this.url1 = 'https://localhost:44376/Upload/images/';

            this.url1 = this.url1 + this.Product.Image;
            window.alert('cập nhật thành công!');
            window.location.reload();
          });
        } else {
          window.alert('cập nhật không thành công!');
        }
      });
    }
  }
  onItemSelect(item: any) {
    // console.log(item);
  }
  onSelectAll(items: any) {
    // console.log(items);
  }
  DeleteImage(id: number) {
    if (confirm('Bạn muốn xóa hình? ')) {
      this.ImageService.deleteImage(id).subscribe((res) => {
        if (res == true) {
          window.location.reload();
        } else {
          window.alert('xóa không thành công!');
        }
      });
    }
  }
  DeleteProduct() {
    if (confirm('Bạn muốn xóa tạm thời? ')) {
      this.Product.Status = false;
      this.Product.IsDeleted = true;

      this.ProductService.trashProduct(this.Product).subscribe((res) => {});

      this.router.navigate(['admin/product/list']);
    }
  }
  CreateImageForm(form: NgForm) {
    var urlImage = form.value.file;
    var filename = urlImage.substring(urlImage.lastIndexOf('\\') + 1);
    console.log(form.value);
    let Image = {
      ProuctId: this.Product.ProductId,

      Title: form.value.title,
      ImageName: filename,
      DisplayOrder: form.value.DisplayOrder,
      Status: true,
      IsDeleted: false,
    };
    this.ImageService.createImage(Image).subscribe((res) => {
      if (res && confirm('Thêm thành công')) {
        window.location.reload();
      } else {
        alert('them thất bại');
      }
    });
  }

  public uploadFile = (files: any) => {
    if (files.lenght === 0) return;

    let fileToUpload = <File>files[0];

    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    // console.log(formData);
    this.http
      .post('https://localhost:44376/api/UploadFileServer/image', formData, {
        reportProgress: true,
        observe: 'events',
      })
      .subscribe((e) => {});
  };
  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event: any) => {
        // called once readAsDataURL is completed
        this.url1 = event.target.result;
      };
    }
  }
}
