import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/Model/category';

import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss'],
})
export class CategoryEditComponent implements OnInit {
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

  editImage = false;

  id = 0;
  Category!: Category;
  constructor(
    private CategoryService: CategoriesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['catId'];
    this.CategoryService.getCategoryById(this.id).subscribe((res) => {
      this.Category = res;
      console.log(this.Category);
    });
  }

  EditCategoryForm(form: NgForm) {
    if (confirm('Bạn muốn cập nhật sản phẩm? ')) {
      let cat = {
        CatId: this.Category.CatId,
        CatName: form.value.name,
        ParentId: this.Category.ParentId,
        CategoryChild: this.Category.CategoryChild,
        Status: form.value.status,
        IsDeleted: false,
      };

      console.log(cat);
      this.CategoryService.editCategory(cat).subscribe((res) => {
        if (res == true) {
          this.CategoryService.getCategoryById(this.id).subscribe((res) => {
            this.Category = res;
            window.alert('cập nhật thành công!');
            console.log(this.Category);
          });
        } else {
          window.alert('cập nhật không thành công!');
        }
      });
    }
  }

  DeleteCategory() {
    if (confirm('Bạn muốn xóa tạm thời? ')) {
      this.Category.Status = false;
      this.Category.IsDeleted = true;

      this.CategoryService.trashCategory(this.Category).subscribe((res) => {
        console.log(res);
      });

      this.router.navigate(['admin/category/list']);
    }
  }
}
