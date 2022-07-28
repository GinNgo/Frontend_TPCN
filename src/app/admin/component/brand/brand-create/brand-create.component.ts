import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/Model/brand';
import { Category } from 'src/app/Model/category';
import { ProductService } from 'src/app/services/product.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { BrandService } from 'src/app/services/brand.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-brand-create',
  templateUrl: './brand-create.component.html',
  styleUrls: ['./brand-create.component.scss'],
})
export class BrandCreateComponent implements OnInit {
  catList: Category[] = [];
  brandList: Brand[] = [];
  id = 0;
  url = 'https://localhost:44376/Upload/images/default-image_100.png';
  constructor(
    private BrandService: BrandService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.BrandService.getBrand().subscribe((res) => {
      this.brandList = res;
    });
  }
  CreateBrandForm(form: NgForm) {
    let Brand = {
      BrandName: form.value.name,
      Status: true,
      IsDeleted: false,
    };
    // console.log(Brand);
    this.BrandService.createBrand(Brand).subscribe((res) => {
      if (res === true) {
        window.alert('thêm thành công');
        window.location.reload();
      } else {
        window.alert('thêm thất bại');
      }
    });
  }
}
