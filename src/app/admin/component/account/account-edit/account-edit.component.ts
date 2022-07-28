import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from 'src/app/Model/account';
import { User } from 'src/app/Model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.scss'],
})
export class AccountEditComponent implements OnInit {
  account!: Account;
  user!: User;
  userId: number = 0;
  role = 0;
  NewPass = '';
  id = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    //get data api
    this.id = this.route.snapshot.params['accId'];
    this.userService.getAccountByUserId(this.id).subscribe((response) => {
      this.account = response;
      this.userId = this.account.UserId;
      this.role = this.account.Role;
      this.userService.getUserById(this.userId).subscribe((response) => {
        this.user = response;
      });
    });
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
    this.account.Role = this.role;
    if (confirm('Bạn muốn cập nhật thông tin? ')) {
      this.userService.updateProfile(this.user).subscribe((res) => {
        if (res) {
          this.userService
            .updateAccountAdmin(this.account)
            .subscribe((resAccount) => {
              if (resAccount) {
                window.alert('cập nhật thành công!');
                this.userService
                  .getUserById(this.userId)
                  .subscribe((response) => {
                    this.user = response;
                  });
              } else {
                window.alert('cập nhật không thành công!');
              }
            });
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
  deleteAccount() {
    if (confirm('Bạn muốn xóa tạm thời? ')) {
      this.userService.trashAccount(this.userId).subscribe((res) => {
        console.log(res);
      });
      this.router.navigate(['admin/account/list']);
    }
  }
}
