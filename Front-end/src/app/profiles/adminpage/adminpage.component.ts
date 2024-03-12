import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TokenserviceService } from '../../shared/tokenservice.service';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrl: './adminpage.component.css'
})





export class AdminpageComponent implements OnInit {
  
  userId = parseInt(this.tokenservice.getUser());
  authHeader = this.tokenservice.getHeaderObject();
  activeTab: string = 'addRestaurant';
  // formData = {
  //   restaurantName: 'Example Restaurant',
  //   phone: '123-456-7890',
  //   email: 'example@example.com',
  //   cityId: '1',
  //   restaurantImage: 'https://via.placeholder.com/150',
  //   name: '',
  //   userName: '',
  //   password: ''
  // };
  orderHistory: any[] = [];
  paymentHistory: any[] = [];
  restaurantData = {
    restaurantId: 0,
    restaurantName: '',
    phone: '',
    email: '',
    cityId: 0,
    restaurantImage: ''
  };
  restaurantAdminData = {
    name: '',
    restaurantId: 0,
    userName: '',
    password: '',
  };

  constructor(private http: HttpClient,private tokenservice : TokenserviceService) { }

  ngOnInit(): void {
    this.fetchOrders();
    this.fetchPayments();
  }

  handleTabChange(tab: string): void {
    this.activeTab = tab;
  }

  // handleInputChangeResto(event: any, fieldName: string): void {
  //   this.formData[fieldName] = event.target.value;
  // }

  handleInputChangeRestoAdmin(event: any, fieldName: string): void {
    this.restaurantAdminData[fieldName] = event.target.value;
  }

  handleRestaurantSubmit(): void {
    // Handle form submission
  }
  


  fetchOrders(): void {
    this.http.get<any[]>('http://localhost:36000/api/Restaurant/GetAllOrders')
      .subscribe(data => this.orderHistory = data);
  }

  fetchPayments(): void {
    this.http.get<any[]>('http://localhost:36000/api/Restaurant/GetAllPayments')
      .subscribe(data => this.paymentHistory = data);
  }
}




