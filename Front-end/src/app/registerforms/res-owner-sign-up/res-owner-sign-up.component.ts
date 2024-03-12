import { Component } from '@angular/core';
import { ResdtoregisterService } from '../../shared/resdtoregister.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-res-owner-sign-up',
  templateUrl: './res-owner-sign-up.component.html',
  styleUrl: './res-owner-sign-up.component.css'
})
export class ResOwnerSignUpComponent {
  constructor(public objservice : ResdtoregisterService, private router: Router)
{
}
ngOnInit()
  {
  this.resetForm();
  }
  resetForm(form?: NgForm)
{
  if(form!=null)
    {
      form.form.reset();
    }
  else
    {
   this.objservice.RestaurantData={Name:'', RestaurantId:null, UserName:'', Password:'', Role:''}
    }
}
onSubmit(form:NgForm)
{
    this.insertRecord (form);
    this.router.navigate(['/res-owner-sign-in']);
}

updateRecord(form : NgForm)
  {
    this.objservice.updateRestaurant().subscribe(res=>{
    this.objservice.RestaurantList();
    alert("Restaurant Details Updated!!!");
    },
      err=>{alert("Error!!!"+err);}
    )

  }
  insertRecord(form: NgForm)
  {
  this.objservice.regRestaurant().subscribe(res=>{
  this.objservice.RestaurantList();
  alert('Restaurant Owner Registeration Successful!!!');
  },
  err =>{alert('Error'+err);})
}

}
