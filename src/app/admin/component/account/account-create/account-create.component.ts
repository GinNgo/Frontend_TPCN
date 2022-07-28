import { UserService } from './../../../../services/user.service';
import { Brand } from './../../../../Model/brand';
import { Category } from './../../../../Model/category';
import { BrandService } from './../../../../services/brand.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-account-create',
  templateUrl: './account-create.component.html',
  styleUrls: ['./account-create.component.scss'],
})
export class AccountCreateComponent implements OnInit {
  check = false;
  isAccount = false;
  confirm = false;
  checkNull = false;
  checkEmail = false;
  success = false;
  crefail = false;
  catList: Category[] = [];
  brandList: Brand[] = [];
  role = 1;
  id = 0;

  constructor(private UserService: UserService, private router: Router) {}

  ngOnInit(): void {}
  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  CreateAccountForm(form: NgForm) {
    this.isAccount = false;
    this.confirm = false;
    this.checkNull = false;
    this.success = false;
    this.crefail = false;
    const newAccount = {
      userid: 0,
      fullname: form.value.name,
      phone: form.value.phone,
      address: form.value.address,
      email: form.value.email,
      username: form.value.username,
      password: form.value.password,
      confirmPassword: form.value.confirmPassword,
      role: form.value.role,
    };

    if (
      newAccount.fullname == '' ||
      newAccount.phone == '' ||
      newAccount.address == '' ||
      newAccount.username == '' ||
      newAccount.password == '' ||
      newAccount.confirmPassword == ''
    ) {
      this.checkNull = true;
    } else if (newAccount.confirmPassword !== newAccount.password) {
      this.confirm = true;
    } else {
      this.UserService.checkAccount(newAccount.username).subscribe((res) => {
        this.check = res;
        if (this.check === true) {
          this.isAccount = true;
        } else {
          this.UserService.checkEmail(newAccount.email).subscribe((res) => {
            this.checkEmail = res;
            if (this.checkEmail === false) {
              this.UserService.createUser(newAccount).subscribe((res) => {
                newAccount.userid = res;
                if (newAccount.userid > 0) {
                  this.UserService.createAccount(newAccount).subscribe(
                    (res) => {
                      this.success = res;
                      this.crefail = false;
                      if (
                        confirm(
                          'Tạo tài khoản thành công! Bạn có muốn tạo thêm?'
                        )
                      ) {
                        window.location.reload();
                      } else {
                        this.router.navigate(['/admin/account/list']);
                      }
                    }
                  );
                } else {
                  this.success = false;
                  this.crefail = true;
                }
              });
            }
          });
        }
      });
    }
  }

  refresh() {
    this.isAccount = false;
    this.confirm = false;
    this.checkNull = false;
    this.success = false;
    this.crefail = false;
  }
}
