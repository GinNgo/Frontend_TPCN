import { CategoriesService } from 'src/app/services/categories.service';

import { Component, OnInit } from '@angular/core';

import { Category } from 'src/app/Model/category';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.scss'],
})
export class CategoryCreateComponent implements OnInit {
  catList: Category[] = [];

  id = 0;
  url = 'https://localhost:44376/Upload/images/default-image_100.png';
  constructor(
    private CategoriesService: CategoriesService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.CategoriesService.getCatCreate().subscribe((res) => {
      this.catList = res;
    });
  }
  CreateBrandForm(form: NgForm) {
    var x = form.value.catParent;
    if (x == '') {
      x = 0;
    }
    let Cat = {
      CatName: form.value.name,
      ParentId: x,
      Status: true,
      IsDeleted: false,
    };
    console.log(Cat);
    this.CategoriesService.createCategory(Cat).subscribe((res) => {
      if (res == true) {
        window.alert('thêm thành công');
        window.location.reload();
      }
    });
  }
}
