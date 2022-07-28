import { BrandService } from 'src/app/services/brand.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductService } from 'src/app/services/product.service';
import { Brand } from 'src/app/Model/brand';
import { Category } from 'src/app/Model/category';
import { Image } from 'src/app/Model/image';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Model/product';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from 'src/app/services/image.service';
import { ProMapCatService } from 'src/app/services/ProMapCat.service';

import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/Model/user';
import { Account } from 'src/app/Model/account';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  validLogin = localStorage.getItem('jwt');
  account!: Account;
  user!: User;
  userId: number = 0;
  Role = 0;
  NewPass = '';
  constructor(
    private router: Router,

    private userService: UserService
  ) {}

  ngOnInit(): void {
    //get data api
    if (this.validLogin) {
      this.userService.getAcount().subscribe(
        (response) => {
          this.account = response;
          this.userId = this.account.UserId;
          this.Role = this.account.Role;
          // if (this.Role === 2) {
          //   this.router.navigate(['/user/']);
          // }
        }
        // },
        // (err) => {
        //   console.log(err);
        // }
      );
      // } else {
      //   this.router.navigate(['/user/login']);
      // }

      this.userService.getProfile().subscribe(
        (response) => {
          this.user = response;
        }
        // (err) => {
        //   console.log(err);
        // }
      );
    }
  }

  EditProfileForm(form: NgForm) {
    let userUpdate = {
      Email: form.value.email,
      Fullname: form.value.name,

      Address: form.value.address,
      Phone: form.value.phone,

      IsDeleted: false,
    };
    this.user.Email = userUpdate.Email;
    this.user.Fullname = userUpdate.Fullname;
    this.user.Address = userUpdate.Address;
    this.user.Phone = userUpdate.Phone;

    if (confirm('Bạn muốn cập nhật sản phẩm? ')) {
      this.userService.updateProfile(this.user).subscribe((res) => {
        if (res) {
          window.alert('cập nhật thành công!');
          this.userService.getProfile().subscribe((response) => {
            this.user = response;
          });
        } else {
          window.alert('cập nhật không thành công!');
        }
      });
    }
  }
  changePass() {
    this.account.Password = this.NewPass;
    this.userService.updatePass(this.account).subscribe((res) => {
      if (res == true) window.alert('cập nhật thành công!');
      else window.alert('cập nhật không thành công!');
    });
    window.location.reload();
  }
}
