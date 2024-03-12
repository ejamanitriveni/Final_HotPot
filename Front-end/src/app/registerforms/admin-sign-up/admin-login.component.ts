import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdmindtologinService } from '../../shared/admindtologin.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Admindtologin } from '../../shared/admindtologin.model';
import { TokenserviceService } from '../../shared/tokenservice.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  constructor( private http : HttpClient, private router : Router, private tokenservice :TokenserviceService )
  {
  }
  loginObj :  any ={
    "UserName":"",
    "Password":"",
    "Role":"",
    "Token":"",
  };
  
  onSubmit(){
    this.http.post('http://localhost:36000/api/Admin/LogIn',this.loginObj).subscribe((res : any)=>{
    console.log(res);  
    if(res.token){
        alert('Login Successful');
        this.tokenservice.addToken(res['body'].token,res['body'].userId);
        this.router.navigateByUrl('/home');
      } else {
        alert("error");
      }
    })
  }
}



