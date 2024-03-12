import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ResdtologinService } from '../../shared/resdtologin.service';
import { TokenserviceService } from '../../shared/tokenservice.service';

@Component({
  selector: 'app-res-owner-sign-in',
  templateUrl: './res-owner-sign-in.component.html',
  styleUrl: './res-owner-sign-in.component.css'
})
export class ResOwnerSignInComponent {
  constructor(public objservice : ResdtologinService, private http : HttpClient, private router : Router, private tokenservice : TokenserviceService )
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
    this.http.post('http://localhost:36000/api/Restaurant/Login',this.loginObj,{observe: 'response' }).subscribe({
      next:data=>{
        console.log(data)
        alert("Login Successful !")
        sessionStorage.setItem('userdata',JSON.stringify(data['body']));
        this.router.navigateByUrl('/restaurant-owner')

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
