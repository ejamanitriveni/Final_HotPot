import { Injectable } from '@angular/core';
import { Resdtoregister } from './resdtoregister.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResdtoregisterService {

  readonly AdminApiUrl = 'http://localhost:36000/api/Restaurant/Register';
  Restaurantlist: Resdtoregister[];
  RestaurantData: Resdtoregister = new Resdtoregister();
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
  public RestaurantList()
{
  this.objHttp.get(this.AdminApiUrl).toPromise().then(res => this.Restaurantlist = res as Resdtoregister[]);
}
  
  public regRestaurant()
{
  this.RestaurantData.RestaurantId=0;
  return this.objHttp.post(this.AdminApiUrl, this.RestaurantData);
}

  public updateRestaurant(){
  return this.objHttp.put(this.AdminApiUrl + '/' + this.RestaurantData.UserName, this.RestaurantData);
}

}
