import { Injectable } from '@angular/core';
import { Admindtoregister } from './admindtoregister.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdmindtoRegisterService {
  readonly AdminApiUrl = 'http://localhost:36000/api/Admin/Register';
  Adminlist: Admindtoregister[];
  AdminData: Admindtoregister = new Admindtoregister();
  constructor(private objHttp: HttpClient) { }
  t = "token";

  headers_object = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': "Bearer " + this.t
});

httpOptions = {
  headers: this.headers_object
};

;
  public AdminList()
{
  this.objHttp.get(this.AdminApiUrl).toPromise().then(res => this.Adminlist = res as Admindtoregister[]);
}
  
  public regAdmin()
{
  this.AdminData.UserId=0;
  return this.objHttp.post(this.AdminApiUrl, this.AdminData);
}

  public updateAdmin(){
  return this.objHttp.put(this.AdminApiUrl + '/' + this.AdminData.UserName, this.AdminData);
}


  
}
