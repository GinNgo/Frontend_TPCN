import { CartService } from './../../../services/cart.service';
import { ProductService } from './../../../services/product.service';
import { Product } from '../../../Model/product';
import { OrderDetail } from '../../../Model/orderDetail';
import { OrderService } from './../../../services/order.service';
import { Order } from '../../../Model/order';
import { Account } from '../../../Model/account';
import { User } from '../../../Model/user';
import { getTestBed } from '@angular/core/testing';
import { UserService } from './../../../services/user.service';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  toggleClass = true;
  listOrder = false;
  checkOldPass = false;
  checkNewPass = false;
  checkOldNewPass = false;
  checkNull = false;
  products: any = [];
  grandTotal: number = 0;
  success = false;
  user!: User;
  account!: Account;
  ListOrder!: Order[];
  ListOrderDetail!: OrderDetail[];
  name: string[] = [];
  fieldTextType: boolean = false;
  fieldTextTypecheck: boolean = false;
  fieldTextTypeNew: boolean = false;
  toggleFieldTextTypeNew() {
    this.fieldTextTypeNew = !this.fieldTextTypeNew;
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  toggleFieldTextTypecheck() {
    this.fieldTextTypecheck = !this.fieldTextTypecheck;
  }
  constructor(
    private userService: UserService,
    private router: Router,
    private OrderService: OrderService,
    private CartService: CartService,
    private ProductService: ProductService
  ) {}

  ngOnInit(): void {
    this.userService.getAcount().subscribe((response) => {
      this.account = response;
      // },
      // (err) => {
      //   console.log(err);
    });
    this.userService.getProfile().subscribe((response) => {
      this.user = response;
      this.OrderService.GetOrderByUserId(this.user.UserId).subscribe((res) => {
        this.ListOrder = res;
        if (this.ListOrder.length > 0) this.listOrder = true;
        else this.listOrder = false;
        console.log(this.listOrder);
      });
      // },
      // (err) => {
      //   console.log(err);
    });
  }
  UpdateProfile(form: NgForm) {
    const valueUpdate = {
      name: form.value.name,
      email: form.value.email,
      address: form.value.address,
      phone: form.value.phone,
    };
    this.user.Address = valueUpdate.address;
    this.user.Fullname = valueUpdate.name;
    this.user.Phone = valueUpdate.phone;
    this.user.Email = valueUpdate.email;
    this.userService.updateProfile(this.user).subscribe((res) => {
      window.location.reload();
    });
  }
  getColor(periodTitle: string) {
    if (periodTitle === 'Đang chuẩn bị hàng') {
      return 'aquamarine';
    } else {
      if (periodTitle === 'Đang vận chuyển') {
        return 'aqua';
      } else {
        if (periodTitle === 'Đang giao hàng') {
          return 'rgb(211, 20, 163)';
        } else {
          if (periodTitle === 'Đã nhận') return 'rgb(28, 50, 241)';
        }
      }
    }
    return '';
  }
  ChangePassword(form: NgForm) {
    const changePassword = {
      oldPass: form.value.oldPass,
      newPass: form.value.newPass,
      confirmPass: form.value.confirmPass,
    };
    //post
    if (
      changePassword.oldPass === '' ||
      changePassword.confirmPass === '' ||
      changePassword.newPass === ''
    ) {
      this.checkNull = true;
    } else {
      //check oldpass
      this.checkNull = false;
      if (changePassword.oldPass != this.account.Password) {
        this.checkOldPass = true;
      } else {
        this.checkOldPass = false;
        //check oldpass and newpass
        if (changePassword.confirmPass === changePassword.oldPass) {
          this.checkOldNewPass = true;
        } else {
          //check confirm pass
          this.checkOldNewPass = false;
          if (changePassword.confirmPass != changePassword.newPass) {
            this.checkNewPass = true;
          } else {
            this.checkNewPass = false;

            //change data to api
            this.account.Password = changePassword.confirmPass;
            this.userService.updatePass(this.account).subscribe((res) => {
              this.success = res;
              if (this.success) {
                this.account.Password = changePassword.confirmPass;
                window.alert('Đổi thành công');
                window.location.reload();
              }
            });

            form.value.oldPass = '';
            form.value.newPass = '';
            form.value.confirmPass = '';
          }
        }
      }
    }
  }
  refresh() {
    this.checkNewPass = false;
    this.checkOldPass = false;
    this.checkOldNewPass = false;
    this.success = false;
  }
  GetOrderdetail(OrderId: number) {
    this.OrderService.GetOrderDetailByOrderId(OrderId).subscribe((res) => {
      this.ListOrderDetail = res;
      let i = 0;
      this.ListOrderDetail.map((e) => {
        this.ProductService.getProductById(e.ProductId).subscribe((res) => {
          this.name[i] = res.ProductName;
          i++;
        });
      });
    });
  }
  delete(item: number) {
    if (confirm('Bạn có muốn hủy đơn hàng')) {
      this.OrderService.DeleteOrder(item).subscribe((res) => {
        if (res) {
          this.OrderService.GetOrderByUserId(this.user.UserId).subscribe(
            (res) => {
              this.ListOrder = res;
              if (this.ListOrder.length > 0) this.listOrder = true;
              else this.listOrder = false;
            }
          );
        }
      });
      window.alert('Hủy đơn thành công!');
      window.location.reload();
    }
  }
}
