import { CartService } from './../../../services/cart.service';
import { AuthService } from './../../../services/auth.service';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  invalidLogin = false;
  products: any = [];
  grandTotal: number = 0;
  public href: string = '';
  fieldTextType: boolean = false;

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  constructor(
    private router: Router,
    private CartService: CartService,
    private AuthService: AuthService,
    private cookie: CookieService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.href = this.router.url;
  }

  login(form: NgForm) {
    const credentials = {
      username: form.value.username,
      password: form.value.password,
    };

    this.AuthService.login(credentials).subscribe(
      (response) => {
        const token = (<any>response).Token;
        localStorage.setItem('jwt', token);
        this.invalidLogin = false;

        this.router.navigate(['/']);
      },
      (err) => {
        this.invalidLogin = true;
        this.showError();
      }
    );
  }
  reset() {
    this.invalidLogin = false;
  }
  showSuccess() {
    this.toast.success({
      detail: 'Thông báo',
      summary: 'Đăng nhập thành công',
      duration: 5000,
    });
  }

  showError() {
    this.toast.error({
      detail: 'Lỗi',
      summary: 'Đăng nhập thất bại',
      sticky: true,
      duration: 5000,
    });
  }

  showInfo() {
    this.toast.info({
      detail: 'INFO',
      summary: 'Your Info Message',
      sticky: true,
    });
  }

  showWarn() {
    this.toast.warning({
      detail: 'WARN',
      summary: 'Your Warn Message',
      duration: 5000,
    });
  }
}
