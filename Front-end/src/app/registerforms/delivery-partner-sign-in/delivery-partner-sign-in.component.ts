import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenserviceService } from '../../shared/tokenservice.service';
import { DelpartnerdtologinService } from '../../shared/delpartnerdtologin.service';

@Component({
  selector: 'app-delivery-partner-sign-in',
  templateUrl: './delivery-partner-sign-in.component.html',
  styleUrl: './delivery-partner-sign-in.component.css'
})
export class DeliveryPartnerSignInComponent {
  constructor(public objservice : DelpartnerdtologinService, private http : HttpClient, private router : Router, private tokenservice : TokenserviceService )
{
}
loginObj :  any ={
  "UserName":"",
  "Password":"",
  "Role":"",
  "Token":"",
};
hidepassword : boolean = false;

onSubmit(){
  this.http.post<any>('http://localhost:36000/api/DeliveryPartner/Login',this.loginObj,{observe: 'response' }).subscribe({
    next:data=>{
      console.log(data['body'])
      this.tokenservice.addToken(data['body'].token, data['body'].userId);
      alert("Login Successful !")
      this.router.navigateByUrl('/delivery-partner-profile')
    },
    error:err=>{
      console.log(err)
      alert("Invalid Credentials !")
    }
  })
  
}
HidePassword(){
  this.hidepassword = !this.hidepassword;

}
}



