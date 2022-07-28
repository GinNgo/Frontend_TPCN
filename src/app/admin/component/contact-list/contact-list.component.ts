import { Suggested } from './../../../Model/suggested';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/Model/account';
import { User } from 'src/app/Model/user';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {
  contact: Suggested[] = [];
  //page
  totalLength: any;
  page: number = 1;
  isMasterSel = false;
  checkedAccountList: any;
  constructor(private Http: HttpClient) {}

  ngOnInit(): void {
    this.Http.get<Suggested[]>('https://localhost:44376/api/contact').subscribe(
      (res) => {
        this.contact = res;
      }
    );
  }
  // DeleteAccount() {
  //   if (confirm('Bạn muốn xóa tạm thời? ')) {
  //     console.log('Implement delete functionality here');
  //     this.checkedAccountList.forEach((e: any) => {
  //       this.UserService.trashAccount(e.UserId).subscribe((res) => {
  //         if (res) {
  //           window.location.reload();
  //         } else {
  //           window.alert('Cập nhật thất bại');
  //         }
  //       });
  //     });
  //   }
  // }

  // checkUncheckAll() {
  //   for (var i = 0; i < this.userList.length; i++) {
  //     this.userList[i].isSelected = this.isMasterSel;
  //   }

  //   this.getCheckedItemList();
  // }

  // isAllSelected() {
  //   this.isMasterSel = this.userList.every(function (item: any) {
  //     return item.isSelected == true;
  //   });

  //   this.getCheckedItemList();
  // }

  // getCheckedItemList() {
  //   this.checkedAccountList = [];

  //   for (var i = 0; i < this.userList.length; i++) {
  //     if (this.userList[i].isSelected)
  //       this.checkedAccountList.push(this.userList[i]);
  //   }
  //   console.log(this.checkedAccountList);
  //   // this.checkedAccountList = JSON.stringify(this.checkedAccountList);
  // }
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
  // TogglleStatus() {
  //   if (confirm('Bạn muốn chuyển đổi trạng thái người dùng? ')) {
  //     this.checkedAccountList.forEach((e: User) => {
  //       this.UserService.toggleAccount(e.UserId).subscribe((res) => {
  //         if (res) {
  //           window.location.reload();
  //         } else {
  //           window.alert('Cập nhật thất bại');
  //         }
  //       });
  //     });
  //   }
  // }
}
