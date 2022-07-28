import { ProMapCatService } from './../../../../services/ProMapCat.service';
import { ProMapCat } from './../../../../Model/ProMapCat';
import { HttpClient } from '@angular/common/http';
import { BrandService } from './../../../../services/brand.service';
import { CategoriesService } from './../../../../services/categories.service';
import { ProductService } from './../../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/Model/brand';
import { Category } from 'src/app/Model/category';
import { Product } from 'src/app/Model/product';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss'],
})
export class ProductCreateComponent implements OnInit {
  catList: Category[] = [];
  brandList: Brand[] = [];
  id = 0;
  url = 'https://localhost:44376/Upload/images/default-image_100.png'; //dropdown
  dropdownList = [{}];
  selectedItems = [];

  dropdownSettings: IDropdownSettings = {};
  constructor(
    private ProductService: ProductService,
    private CategoriesService: CategoriesService,
    private BrandService: BrandService,
    private ProMapCatService: ProMapCatService,
    private router: Router,
    private http: HttpClient,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'CatId',
      textField: 'CatName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true,
    };
    this.CategoriesService.getCatAddProduct().subscribe((res) => {
      this.catList = res;
      this.dropdownList = this.catList;
    });

    this.BrandService.getBrand().subscribe((res) => {
      this.brandList = res;
    });
  }
  showSuccess() {
    this.toast.success({
      detail: 'Thông báo',
      summary: 'Thêm thành công',
      duration: 5000,
    });
  }

  showError() {
    this.toast.error({
      detail: 'Lỗi',
      summary: 'Thêm thất bại',
      sticky: true,
      duration: 5000,
    });
  }

  showInfo() {
    this.toast.info({
      detail: 'INFO',
      summary: 'Your Info Message',
      sticky: true,
    });
  }

  showWarn() {
    this.toast.warning({
      detail: 'WARN',
      summary: 'Your Warn Message',
      duration: 5000,
    });
  }
  CreateProductForm(form: NgForm) {
    var urlImage = form.value.file;
    var filename = urlImage.substring(urlImage.lastIndexOf('\\') + 1);
    var cat: Category[] = this.selectedItems;
    if (
      form.value.name === undefined ||
      !form.value.fullDescription ||
      !form.value.price ||
      !form.value.priceDiscount ||
      !filename ||
      !form.value.brand ||
      !form.value.origin ||
      !cat[0].CatId ||
      form.value.Price < form.value.priceDiscount
    ) {
      this.showError();
    } else {
      let Product = {
        ProductName: form.value.name,
        ShortDesc: form.value.description,
        FullDesc: form.value.fullDescription,
        Price: form.value.price,
        PriceDiscount: form.value.priceDiscount,
        Image: filename,
        BrandId: form.value.brand,
        Origin: form.value.origin,
        CategoryId: cat[0].CatId,
        Status: true,
        IsDeleted: false,
      };

      this.ProductService.createProduct(Product).subscribe((res) => {
        cat.forEach((e) => {
          var ProMap = {
            CategoryId: e.CatId,
            ProductId: res,
          };
          this.ProMapCatService.create(ProMap).subscribe((r) => {});
        });
        if (confirm('Thêm thành công! Bạn có muốn tiếp tục thêm sản phẩm? ')) {
          window.location.reload();
        } else {
          this.router.navigate(['/admin/product/list']);
        }
      });
    }
  }
  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  onItemSelect(item: any) {
    // console.log(item);
  }
  onSelectAll(items: any) {
    // console.log(items);
  }
  public uploadFile = (files: any) => {
    if (files.lenght === undefined) {
      this.showError();
    } else {
      let fileToUpload = <File>files[0];

      const formData = new FormData();
      formData.append('file', fileToUpload, fileToUpload.name);

      this.http
        .post('https://localhost:44376/api/UploadFileServer/image', formData, {
          reportProgress: true,
          observe: 'events',
        })
        .subscribe((e) => {
          // console.log(e);
        });
    }
  };
  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event: any) => {
        // called once readAsDataURL is completed
        this.url = event.target.result;
      };
    }
  }
}
