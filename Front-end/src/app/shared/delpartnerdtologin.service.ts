import { Injectable } from '@angular/core';
import { Delpartnerdtologin } from './delpartnerdtologin.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DelpartnerdtologinService {
  readonly DeliverypartnerApiUrl='http://localhost:36000/api/DeliveryPartner/Login';
  list: Delpartnerdtologin [];
  DeliverypartnerData: Delpartnerdtologin =new Delpartnerdtologin ();

  constructor(private http: HttpClient, private router: Router) { }

  
  login(username: string, password: string): Observable<any> {
    
    return this.http.post('./app/usercredentials.json', { username, password })

  }

  
}
