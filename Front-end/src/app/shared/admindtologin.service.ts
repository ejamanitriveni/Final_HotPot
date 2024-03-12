import { Injectable } from '@angular/core';
import { Admindtologin } from './admindtologin.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdmindtologinService {

  // readonly AdminApiUrl='http://localhost:36000/api/Admin/Login';
  // Adminlist: Admindtologin[];
  // AdminData: Admindtologin=new Admindtologin();
  // constructor (private objHttp: HttpClient) {}

  Adminlist: Admindtologin[];
  AdminData: Admindtologin=new Admindtologin();
  constructor(private http: HttpClient, private router: Router) { }

  
  login(Username: string, Password: string): Observable<any> {
    
    return this.http.post('./app/usercredentials.json', { Username, Password })

  }
}
  
//}
