import { Injectable } from '@angular/core';
import { Userdtologin } from './userdtologin.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserdtologinService {

  readonly CustomerApiUrl='http://localhost:36000/api/Customer/LogIn';
  list: Userdtologin[];
  CustomerData: Userdtologin=new Userdtologin();

  constructor(private http: HttpClient, private router: Router) { }

  
  login(username: string, password: string): Observable<any> {
    
    return this.http.post('./app/usercredentials.json', { username, password })

  }


}
