import { CartService } from './../../../services/cart.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../../Model/category';
import { CategoriesService } from './../../../services/categories.service';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  @Output() AddCatId = new EventEmitter<number>();

  categoryList: Category[] = [];
  products: any = [];
  grandTotal: number = 0;
  constructor(
    private CategoriesService: CategoriesService,
    private CartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.CategoriesService.getCat().subscribe((res) => {
      this.categoryList = res;
    });
  }
  onClick() {
    this.AddCatId.emit(this.route.snapshot.params['CatId']);
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
