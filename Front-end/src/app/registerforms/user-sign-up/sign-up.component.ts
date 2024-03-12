import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserdtoRegisterService } from '../../shared/userdtoregister.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  constructor(public objservice : UserdtoRegisterService, private router : Router)
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
   this.objservice.CustomerData={Name:'', Email:'', Phone:'', UserName:'', Password:'', Role:''}
    }
}
onSubmit(form:NgForm)
{
    this.insertRecord (form);
    this.router.navigate(['/user-sign-in']);
}

updateRecord(form : NgForm)
  {
    this.objservice.updateCustomer().subscribe(res=>{
    this.objservice.CustomerList();
    alert("Customer Details Updated!!!");
    },
      err=>{alert("Error!!!"+err);}
    )

  }
  insertRecord(form: NgForm)
  {
  this.objservice.regCustomer().subscribe(res=>{
  this.objservice.CustomerList();
  alert('Customer Registeration Successful!!!');
  },
  err =>{alert('Error'+err);})
}
  
}
