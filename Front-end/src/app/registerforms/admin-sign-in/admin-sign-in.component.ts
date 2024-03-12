import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-sign-in',
  templateUrl: './admin-sign-in.component.html',
  styleUrl: './admin-sign-in.component.css'
})
export class AdminSignInComponent {
  constructor( private http : HttpClient, private router : Router )
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
    this.http.post('http://localhost:36000/api/Admin/LogIn',this.loginObj,{observe: 'response' }).subscribe({
      next:data=>{
        console.log(data)
        alert("Login Successful !")
        this.router.navigateByUrl('/adminpage')
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


