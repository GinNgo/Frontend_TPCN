import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SlideService {
  constructor(private Http: HttpClient) {}
  readonly APIUrl = 'https://localhost:44376/api/';
  getSlide() {
    return this.Http.get<any>(this.APIUrl + 'slide');
  }
}
