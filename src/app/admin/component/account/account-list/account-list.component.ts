import { UserService } from './../../../../services/user.service';
import { Account } from 'src/app/Model/account';

import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Model/product';
import { User } from 'src/app/Model/user';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss'],
})
export class AccountListComponent implements OnInit {
  userList: User[] = [];
  accountList: Account[] = [];
  //page
  totalLength: any;
  page: number = 1;
  isMasterSel = false;
  checkedAccountList: any;
  constructor(private UserService: UserService) {}

  ngOnInit(): void {
    this.UserService.getAllAcount().subscribe((res) => {
      this.accountList = res;
      this.accountList = this.accountList.sort(
        (a: Account, b: Account) => b.UserId - a.UserId
      );
      this.accountList.forEach((e) => {
        this.UserService.getUserById(e.UserId).subscribe((resUser) => {
          this.userList.push(resUser);
        });
      });
      this.userList = this.userList.sort(
        (a: User, b: User) => b.UserId - a.UserId
      );
      console.log(this.accountList, this.userList);
      this.totalLength = this.userList.length;
    });
  }
  DeleteAccount() {
    if (confirm('Bạn muốn xóa tạm thời? ')) {
      console.log('Implement delete functionality here');
      this.checkedAccountList.forEach((e: any) => {
        this.UserService.trashAccount(e.UserId).subscribe((res) => {
          if (res) {
            window.location.reload();
          } else {
            window.alert('Cập nhật thất bại');
          }
        });
      });
    }
  }

  checkUncheckAll() {
    for (var i = 0; i < this.userList.length; i++) {
      this.userList[i].isSelected = this.isMasterSel;
    }

    this.getCheckedItemList();
  }

  isAllSelected() {
    this.isMasterSel = this.userList.every(function (item: any) {
      return item.isSelected == true;
    });

    this.getCheckedItemList();
  }

  getCheckedItemList() {
    this.checkedAccountList = [];

    for (var i = 0; i < this.userList.length; i++) {
      if (this.userList[i].isSelected)
        this.checkedAccountList.push(this.userList[i]);
    }
    console.log(this.checkedAccountList);
    // this.checkedAccountList = JSON.stringify(this.checkedAccountList);
  }
  clickMethod(name: string) {
    if (confirm('Are you sure to delete ' + name)) {
      console.log('Implement delete functionality here');
    }
  }
  addProductName(event: any) {
    const ProductName = event;
    // if (ProductName) {
    //   this.ProductService.getProductByName(ProductName).subscribe((res) => {
    //     this.productList = res;
    //     this.totalLength = this.productList.length;
    //   });
    // } else {
    //   this.ProductService.getProduct().subscribe((res) => {
    //     this.productList = res;
    //     this.totalLength = this.productList.length;
    //   });
    // }
  }
  TogglleStatus() {
    if (confirm('Bạn muốn chuyển đổi trạng thái người dùng? ')) {
      this.checkedAccountList.forEach((e: User) => {
        this.UserService.toggleAccount(e.UserId).subscribe((res) => {
          if (res) {
            window.location.reload();
          } else {
            window.alert('Cập nhật thất bại');
          }
        });
      });
    }
  }
}
