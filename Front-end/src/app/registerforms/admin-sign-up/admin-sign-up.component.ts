import { Component } from '@angular/core';
import { AdmindtoRegisterService } from '../../shared/admindtoregister.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-sign-up',
  templateUrl: './admin-sign-up.component.html',
  styleUrl: './admin-sign-up.component.css'
})
export class AdminSignUpComponent {
  constructor(public objser : AdmindtoRegisterService, private router : Router)
  {
  }
  ngOnInit()
    {
    this.resetForm()
    }
    resetForm(form?: NgForm)
  {
    if(form!=null)
      {
        form.form.reset();
      }
    else
      {
     this.objser.AdminData={UserId: null, UserName:'', Password:'', Role:'', Token:''}
      }
  }
  onSubmit(form:NgForm)
  {
      this.insertRecord (form);
      this.router.navigate(['/admin-sign-in']);
  }
  
  updateRecord(form : NgForm)
    {
      this.objser.updateAdmin().subscribe(res=>{
      this.objser.AdminList();
      alert("Admin Details Updated!!!");
      },
        err=>{alert("Error!!!"+err);}
      )
  
    }
    insertRecord(form: NgForm)
    {
    this.objser.regAdmin().subscribe(res=>{
    this.objser.AdminList();
    alert('Admin Registeration Successful!!!');
    },
    err =>{alert('Error'+err);})
  }

}
