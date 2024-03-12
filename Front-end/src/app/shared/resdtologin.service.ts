import { Injectable } from '@angular/core';
import { Resdtologin } from './resdtologin.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResdtologinService {

  readonly CustomerApiUrl='http://localhost:36000/api/Restaurant/LogIn';
  list: Resdtologin[];
  CustomerData: Resdtologin=new Resdtologin();

  constructor(private http: HttpClient, private router: Router) { }

  
  login(username: string, password: string): Observable<any> {
    
    return this.http.post('./app/usercredentials.json', { username, password })

  }
}
