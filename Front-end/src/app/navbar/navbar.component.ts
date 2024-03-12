import { Component, HostListener } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchnewService } from '../shared/searchnew.service';
import { TokenserviceService } from '../shared/tokenservice.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  isNavbarOpen = false;

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent) {
    if (this.isNavbarOpen) {
      this.toggleNavbar();
    }
  }
  
  FoodMunchImage : string = "assets/images/food-munch-img.png";
  myForm: FormGroup;

  constructor(private route:Router,private dataService:SearchnewService, private tokenservice : TokenserviceService, private router : Router) {
    this.myForm = new FormGroup({
      inputValue: new FormControl('')
    });

  }

  submit() {
    this.dataService.setData(this.myForm.value.inputValue);
    this.route.navigateByUrl('/search')

  }

  logout(){
    this.tokenservice.removetoken();
    alert("Session logged out !");
    this.router.navigate(['/startpage']);
  }

}