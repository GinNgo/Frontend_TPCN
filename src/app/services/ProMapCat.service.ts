import { ProMapCat } from './../Model/ProMapCat';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProMapCatService {
  constructor(private Http: HttpClient) {}
  readonly APIUrl = 'https://localhost:44376/api/Pro_Map_Cat/';
  get(id: number) {
    return this.Http.get<ProMapCat[]>(this.APIUrl + id);
  }
  create(map: any) {
    return this.Http.post<any>(this.APIUrl + map, map);
  }
  update(map: any) {
    return this.Http.put<any>(this.APIUrl + map, map);
  }

  delete(id: number) {
    return this.Http.delete<any>(this.APIUrl + id);
  }
}
