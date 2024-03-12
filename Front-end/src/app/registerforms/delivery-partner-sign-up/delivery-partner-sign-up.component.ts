import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DelpartnerdtoregisterService } from '../../shared/delpartnerdtoregister.service';

@Component({
  selector: 'app-delivery-partner-sign-up',
  templateUrl: './delivery-partner-sign-up.component.html',
  styleUrl: './delivery-partner-sign-up.component.css'
})
export class DeliveryPartnerSignUpComponent {

  constructor(public objservice : DelpartnerdtoregisterService,private router: Router)
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
   this.objservice.DeliveryPartnerData={Name:'', Email:'',cityId:null ,Phone:'', UserName:'', Password:'', Role:''}
    }
}

onSubmit(form:NgForm)
{
   this.insertRecord (form);
    this.router.navigate(['/delivery-partner-sign-in']);
}

updateRecord(form : NgForm)
  {
    this.objservice.updateDeliveryPartner().subscribe(res=>{
    this.objservice.DeliveryPartnerList();
    alert("Delivery Partner Details Updated!!!");
    },
      err=>{alert("Error!!!"+err);}
    )

  }
  insertRecord(form: NgForm)
  {
  this.objservice.regDeliveryPartner().subscribe(res=>{
  this.objservice.DeliveryPartnerList();
  alert('DeliveryPartner Registeration Successful!!!');
  },
  err =>{alert('Error'+err);})
}
  
}



