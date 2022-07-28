import { CartService } from './../../../services/cart.service';
import { User } from '../../../Model/user';
import { Account } from '../../../Model/account';
import { UserService } from './../../../services/user.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  check = false;
  isAccount = false;
  confirm = false;
  checkNull = false;
  checkEmail = false;

  grandTotal: number = 0;
  userId!: number;
  success = false;
  crefail = false;
  fieldTextType: boolean = false;
  fieldTextTypecheck: boolean = false;
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  toggleFieldTextTypecheck() {
    this.fieldTextTypecheck = !this.fieldTextTypecheck;
  }
  constructor(
    private router: Router,

    private UserService: UserService
  ) {}

  ngOnInit(): void {}
  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  register(form: NgForm) {
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
      confirmPass: form.value.confirmPass,
      role: 2,
    };

    if (
      newAccount.fullname == '' ||
      newAccount.phone == '' ||
      newAccount.address == '' ||
      newAccount.username == '' ||
      newAccount.password == '' ||
      newAccount.confirmPass == ''
    ) {
      this.checkNull = true;
    } else if (newAccount.confirmPass !== newAccount.password) {
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
                          'Tạo tài khoản thành công! Bạn có muốn chuyển sang trang đăng nhập'
                        )
                      ) {
                        this.router.navigate(['user/login']);
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
