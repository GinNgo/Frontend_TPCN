import { User } from './../Model/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private Http: HttpClient) {}
  readonly APIUrl = 'https://localhost:44376/api/auth/login';

  login(credentiasls: any) {
    return this.Http.post(this.APIUrl, credentiasls);
  }
}
