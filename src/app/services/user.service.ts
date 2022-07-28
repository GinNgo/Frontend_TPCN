import { Account } from './../Model/account';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Model/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly APIUrl = 'https://localhost:44376/api/user/';
  constructor(private Http: HttpClient) {}

  getAcount() {
    return this.Http.get<Account>(this.APIUrl + 'getAccount');
  }
  getAllAcount() {
    return this.Http.get<Account[]>(this.APIUrl + 'getAllAccount');
  }
  getAllAcountTrash() {
    return this.Http.get<Account[]>(this.APIUrl + 'getAllAccountTrash');
  }
  getNumberUsers() {
    return this.Http.get<number>(this.APIUrl);
  }
  checkEmail(email: string) {
    return this.Http.get<boolean>(this.APIUrl + 'checkEmail/' + email);
  }
  //-getProfile
  getProfile() {
    return this.Http.get<User>(this.APIUrl + 'getProfile/');
  }
  //get userID
  getUserById(UserId: any) {
    return this.Http.get<User>(this.APIUrl + 'getUserById/' + UserId);
  }
  getAccountByUserId(UserId: any) {
    return this.Http.get<Account>(this.APIUrl + 'getAccountByUserId/' + UserId);
  }
  //get UserId
  getUserId(user: any) {
    return this.Http.get<number>(this.APIUrl + 'getUserId/' + user);
  }
  //UpdatePass
  updatePass(account: Account) {
    return this.Http.put<boolean>(
      this.APIUrl + 'updateAccount/' + account,
      account
    );
  }
  updateAccountAdmin(account: Account) {
    return this.Http.put<boolean>(
      this.APIUrl + 'updateAccountAdmin/' + account,
      account
    );
  }
  //updateprofile
  updateProfile(user: User) {
    return this.Http.put<boolean>(this.APIUrl + 'updateProfile/' + user, user);
  }

  trashAccount(userId: number) {
    return this.Http.put<boolean>(
      this.APIUrl + 'trashAccount/' + userId,
      userId
    );
  }
  toggleAccount(userId: number) {
    return this.Http.put<boolean>(
      this.APIUrl + 'toggleAccount/' + userId,
      userId
    );
  }

  //checkAccount
  checkAccount(username: string) {
    return this.Http.post<boolean>(
      this.APIUrl + 'checkAccount/' + username,
      username
    );
  }
  //create UserProfile
  createUser(user: any) {
    return this.Http.post<number>(this.APIUrl + 'createUser/' + user, user);
  }
  //create
  createAccount(account: any) {
    console.log(account);
    return this.Http.post<boolean>(
      this.APIUrl + 'createAccount/' + account,
      account
    );
  }
  delete(userId: string) {
    return this.Http.delete<string>(this.APIUrl + userId);
  }
}
