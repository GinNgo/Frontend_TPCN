import { Image } from 'src/app/Model/image';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private Http: HttpClient) {}
  readonly APIUrl = 'https://localhost:44376/api/image/';
  getImage(id: number) {
    return this.Http.get<Image[]>(this.APIUrl + id);
  }
  createImage(image: any) {
    return this.Http.post<any>(this.APIUrl + image, image);
  }
  updateImage(image: any) {
    return this.Http.put<any>(this.APIUrl + image, image);
  }
  deleteImage(image: number) {
    return this.Http.delete<boolean>(this.APIUrl + image);
  }
}
