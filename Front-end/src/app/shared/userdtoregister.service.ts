import { Injectable } from '@angular/core';
import { Userdtoregister } from './userdtoregister.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserdtoRegisterService {
  readonly CustomerApiUrl='http://localhost:36000/api/Customer/Register';
  list: Userdtoregister[];
  CustomerData: Userdtoregister=new Userdtoregister();
  constructor (private objHttp: HttpClient) {}
  public CustomerList()
  {
  this.objHttp.get(this.CustomerApiUrl).toPromise().then(res=>this.list=res as Userdtoregister[]);
  }
  
  public regCustomer()
  {
    return this.objHttp.post(this.CustomerApiUrl,this.CustomerData);
  }

  public updateCustomer(){
    return this.objHttp.put(this.CustomerApiUrl+'/'+this.CustomerData.UserName,this.CustomerData);
  }
}
