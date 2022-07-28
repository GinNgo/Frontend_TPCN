import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-scroll-admin',
  templateUrl: './button-scroll-bottom.component.html',
  styleUrls: ['./button-scroll-bottom.component.scss'],
})
export class ButtonScrollAdminComponent implements OnInit {
  turnOn: boolean = false;
  constructor() {}

  ngOnInit(): void {}
  @HostListener('window:scroll', ['$event.target'])
  onScroll(event: any) {
    let scroll = event.scrollingElement.scrollTop;
    if (scroll >= 100) {
      this.turnOn = true;
    } else {
      this.turnOn = false;
    }
  }
  backToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
