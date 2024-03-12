import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserdtologinService } from '../../shared/userdtologin.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenserviceService } from '../../shared/tokenservice.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  constructor(public objservice : UserdtologinService, private http : HttpClient, private router : Router, private tokenservice : TokenserviceService )
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
  this.http.post<any>('http://localhost:36000/api/Customer/LogIn',this.loginObj,{observe: 'response' }).subscribe({
    next:data=>{
      console.log(data['body'])
      this.tokenservice.addToken(data['body'].token, data['body'].userId);
      alert("Login Successful !")
      this.router.navigateByUrl('/home')
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
