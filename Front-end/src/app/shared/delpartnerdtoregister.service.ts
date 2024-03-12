import { Injectable } from '@angular/core';
import { Delpartnerdtoregister } from './delpartnerdtoregister.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DelpartnerdtoregisterService {
  readonly DeliveryPartnerApiUrl='http://localhost:36000/api/DeliveryPartner/Register';
  list: Delpartnerdtoregister[];
  DeliveryPartnerData: Delpartnerdtoregister=new Delpartnerdtoregister();
  constructor (private objHttp: HttpClient) {}
  public DeliveryPartnerList()
  {
  this.objHttp.get(this.DeliveryPartnerApiUrl).toPromise().then(res=>this.list=res as Delpartnerdtoregister[]);
  }
  
  public regDeliveryPartner()
  {
    return this.objHttp.post(this.DeliveryPartnerApiUrl,this.DeliveryPartnerData);
  }

  public updateDeliveryPartner(){
    return this.objHttp.put(this.DeliveryPartnerApiUrl+'/'+this.DeliveryPartnerData.UserName,this.DeliveryPartnerData);
  }
}
