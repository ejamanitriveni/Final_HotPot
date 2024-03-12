import { Injectable } from '@angular/core';
import { Deliverypartnerdtoregister } from './deliverypartnerdtoregister.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeliverypartnerdtoregisterService {

  

  readonly DeliveryPartnerApiUrl='http://localhost:36000/api/DeliveryPartner/Register';
  list: Deliverypartnerdtoregister[];
  DeliveryPartnerData: Deliverypartnerdtoregister=new Deliverypartnerdtoregister();
  constructor (private objHttp: HttpClient) {}
  public DeliveryPartnerList()
  {
  this.objHttp.get(this.DeliveryPartnerApiUrl).toPromise().then(res=>this.list=res as Deliverypartnerdtoregister[]);
  }
  
  public regDeliveryPartner()
  {
    return this.objHttp.post(this.DeliveryPartnerApiUrl,this.DeliveryPartnerData);
  }

  public updateDeliveryPartner(){
    return this.objHttp.put(this.DeliveryPartnerApiUrl+'/'+this.DeliveryPartnerData.UserName,this.DeliveryPartnerData);
  }
}

