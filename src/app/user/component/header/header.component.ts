import { Product } from './../../../Model/product';
import { CartService } from './../../../services/cart.service';
import { UserService } from './../../../services/user.service';
import { User } from '../../../Model/user';
import { Account } from '../../../Model/account';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {
  Component,
  HostListener,
  OnInit,
  EventEmitter,
  Output,
  Input,
} from '@angular/core';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  turnOn: boolean = false;
  validLogin = localStorage.getItem('jwt');
  account!: Account;
  user!: User;
  userId: number = 0;
  Role = 0;
  productName: string = '';
  // loginStatus: boolean = false;
  // registerStatus: boolean = false;
  // fadeStatus: boolean = true;
  boolshow = true;
  boolhide = false;
  name: string = '';
  public totalItem: number = 0;
  products: Product[] = [];
  // @HostListener('window:beforeunload', ['$event'])
  // beforeunloadHandler(event: any) {
  //   localStorage.removeItem('jwt');
  // }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jwtHelper: JwtHelperService,
    private userService: UserService,
    private CartService: CartService
  ) {}
  currentPosition = window.pageYOffset;
  ngOnInit(): void {
    var products1 = localStorage.getItem('product');

    if (products1) {
      localStorage.removeItem('product');
      this.CartService.removeAllCart();
      JSON.parse(products1).forEach((e: any) => {
        this.CartService.addToCart(e);
      });
    }
    //get data api

    if (this.validLogin) {
      this.userService.getAcount().subscribe(
        (response) => {
          this.account = response;
          this.userId = this.account.UserId;
          this.Role = this.account.Role;
        },
        (err) => {
          console.log(err);
          localStorage.removeItem('jwt');
          this.validLogin = localStorage.getItem('jwt');
          this.Role = 0;
          this.router.navigate(['/']);
        }
      );

      this.userService.getProfile().subscribe(
        (response) => {
          this.user = response;
        }
        // (err) => {
        //   console.log(err);
        // }
      );
    }
    //nmbercartItem
    this.CartService.getProducts().subscribe((res) => {
      this.totalItem = res.length;
      this.products = res;
      localStorage.removeItem('product');
      localStorage.setItem('product', JSON.stringify(this.products));
    });
  }
  @HostListener('window:scroll', ['$event.target']) // for window scroll events
  onScroll(event: any) {
    let scroll = event.scrollingElement.scrollTop;
    if (scroll >= 50) {
      this.turnOn = true;
    } else {
      this.turnOn = false;
    }
  }

  LogOut() {
    localStorage.removeItem('jwt');
    this.validLogin = null;
    this.Role = 0;
    this.emptyCart();
    this.router.navigate(['/']);
  }
  toggle(): void {
    this.validLogin = localStorage.getItem('jwt');
  }
  addProductName(event: any) {
    this.productName = event;
  }
  emptyCart() {
    this.CartService.removeAllCart();
  }
}
