import { User } from './../../../Model/user';
import { Account } from './../../../Model/account';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  validLogin = localStorage.getItem('jwt');
  account!: Account;
  user!: User;
  userId: number = 0;
  Role = 0;
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
          if (this.Role === 2) {
            this.router.navigate(['**']);
          }
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
    } else {
      this.Role = 0;
      this.router.navigate(['**']);
    }
  }
  LogOut() {
    localStorage.removeItem('jwt');
    this.validLogin = localStorage.getItem('jwt');
    this.Role = 0;
    this.router.navigate(['/']);
  }
  toggle(): void {
    this.validLogin = localStorage.getItem('jwt');
  }
}
