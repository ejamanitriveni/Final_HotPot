import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenserviceService {

  constructor() { }

  addToken(token : string, userId : number){
    sessionStorage.setItem('logInToken', token);
    sessionStorage.setItem('userId',userId.toString())
  }

  getToken(){
    return sessionStorage.getItem('logInToken');
  }

  getUser(){
    return sessionStorage.getItem('userId');

  }

  isLoggedIn(){
    return sessionStorage.getItem('userId')!=null;
  }

  getHeaderObject(){
    return {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.getToken())
    };
  }

  removetoken(){
    sessionStorage.removeItem('logInToken');
    sessionStorage.removeItem('userId');
  }

}
