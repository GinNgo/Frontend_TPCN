import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/Model/account';
import { User } from 'src/app/Model/user';

@Component({
  selector: 'app-account-trash',
  templateUrl: './account-trash.component.html',
  styleUrls: ['./account-trash.component.scss'],
})
export class AccountTrashComponent implements OnInit {
  userList: User[] = [];
  accountList: Account[] = [];
  //page
  totalLength: any;
  page: number = 1;
  isMasterSel = false;
  checkedAccountList: any;
  constructor(private UserService: UserService) {}

  ngOnInit(): void {
    this.UserService.getAllAcountTrash().subscribe((res) => {
      this.accountList = res;
      console.log(this.accountList);
      let i = 0;
      this.accountList.forEach((e) => {
        this.UserService.getUserById(e.UserId).subscribe((resUser) => {
          this.userList[i] = resUser;
          i++;
        });
      });
      this.totalLength = this.userList.length;
    });
  }
  toggleAccount() {
    if (confirm('Bạn muốn phục hồi? ')) {
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
  deleteAccount() {
    if (confirm('Bạn muốn xóa? ')) {
      console.log('Implement delete functionality here');
      this.checkedAccountList.forEach((e: any) => {
        this.UserService.delete(e.UserId).subscribe((res) => {
          if (res) {
            window.location.reload();
          } else {
            window.alert('Xóa thất bại');
          }
        });
      });
    }
  }
}
