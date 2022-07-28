import { Brand } from 'src/app/Model/brand';

import { ImageService } from './../../../../services/image.service';
import { BrandService } from 'src/app/services/brand.service';

import { Image } from 'src/app/Model/image';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-brand-edit',
  templateUrl: './brand-edit.component.html',
  styleUrls: ['./brand-edit.component.scss'],
})
export class BrandEditComponent implements OnInit {
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
  List!: Brand;

  editImage = false;
  Image!: Image;
  id = 0;
  Brand!: Brand;
  constructor(
    private BrandService: BrandService,
    private route: ActivatedRoute,
    private router: Router,
    private ImageService: ImageService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['brandId'];
    this.BrandService.getBrandById(this.id).subscribe((res) => {
      this.Brand = res;
      console.log(this.Brand);
    });
  }

  EditBrandForm(form: NgForm) {
    let brand = {
      BrandId: this.Brand.BrandId,
      BrandName: form.value.name,

      Status: form.value.status,
      IsDeleted: false,
    };
    console.log(brand);
    if (confirm('Bạn muốn cập nhật sản phẩm? ')) {
      this.BrandService.editBrand(brand).subscribe((res) => {
        if (res == true) {
          this.router.navigate(['admin/brand/list']);
        } else {
          window.alert('cập nhật không thành công!');
        }
      });
    }
  }

  DeleteBrand() {
    if (confirm('Bạn muốn xóa tạm thời? ')) {
      this.Brand.Status = false;
      this.Brand.IsDeleted = true;

      this.BrandService.trashBrand(this.Brand).subscribe((res) => {
        console.log(res);
      });

      this.router.navigate(['admin/brand/list']);
    }
  }
}
