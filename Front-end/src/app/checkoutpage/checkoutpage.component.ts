
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { TokenserviceService } from '../shared/tokenservice.service';

interface OrderSummary {
  cartId: number;
  customerId: number;
  restaurantId: number;
  menuItemId: number;
  menuTitle: string;
  quantity: number;
  price: number;
  menuImage: string;
  restaurantName: string;
  restaurantCityId: number;
 }

interface Address {
  houseNumber: string;
  buildingName: string;
  locality: string;
  cityId:number;
  // city: {
  //   id:number;
  //   name: string;
  // };
  landMark: string;
}
@Component({
  selector: 'app-checkoutpage',
  templateUrl: './checkoutpage.component.html',
  styleUrl: './checkoutpage.component.css'
})

export class CheckoutpageComponent implements OnInit {
  activeTab: string = 'orders';
  orderSummary: OrderSummary[] = [];
  address: Address | null = null;
  loading = true;
  error: string | null = null;
  customerId = parseInt(this.tokenservice.getUser());
  authHeader = this.tokenservice.getHeaderObject();
  // customerId: string | null = sessionStorage.getItem('UserId');
  // customerToken: string | null = sessionStorage.getItem('Token');
  isLoggedIn$: Observable<boolean>;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private tokenservice : TokenserviceService,
    // private store: Store<{ auth: { isLoggedIn: boolean } }>
  ) {}

  ngOnInit(): void {
    const requestOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.authHeader })
    };

    // Fetch order summary
    this.http.get<OrderSummary[]>(`http://localhost:36000/api/Customer/ViewCart?userId=${this.customerId}`, requestOptions)
      .subscribe(
        orderSummaryResponse => {
          this.orderSummary = orderSummaryResponse;
        },
        error => {
          this.error = error.message;
          console.error(error);
        }
      );

      
    // Fetch customer address
    this.http.get<Address>(`http://localhost:36000/api/Customer/address/${this.customerId}`, requestOptions)
      .subscribe(
        addressResponse => {
          this.address = addressResponse;
          console.log(addressResponse);
        },
        error => {
          this.error = error.message;
          console.error(error);
        }
      );

    this.loading = false;
  }
  calculateTotalAmount(): number {
    let totalAmount = 0;
    for (const item of this.orderSummary) {
      totalAmount += item.price ;
    }
    return totalAmount;
  }

  calculateTotalQuantity(): number {
    let totalquantity = 0;
    for (const item of this.orderSummary) {
      totalquantity += item.quantity ;
    }
    return totalquantity;
  }

  
  handlePlaceOrder(): void {
    if (!this.address || !this.address.houseNumber || !this.address.buildingName || !this.address.locality) {
      alert("Please provide an address to place an order");
    } else if (this.orderSummary.length > 0 && this.orderSummary[0].restaurantCityId !== this.address.cityId) {
      alert("Cannot deliver order to an address in a different city. Please update your address and try again");
    } else {
      const isConfirmed = window.confirm("Do you want to place the order?");
      if (isConfirmed) {
        const requestOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authHeader })
        };
        this.http.post(`http://localhost:36000/api/Customer/PlaceOrderForAll?customerId=${this.customerId}&paymentMode=online`, {}, requestOptions)
          .subscribe(
            () => {
              alert("Order placed!");
              this.router.navigate(['/thank-you']);
            },
            error => {
              console.error(error);
            }
          );
      }
    }
  }
  
  navigateToMenu(): void {
    if (this.orderSummary.length > 0) {
      const restaurantId = this.orderSummary[0].restaurantId;
      this.router.navigate(['/explore-menu-section', restaurantId]);
    }
  }

  navigateToProfile(): void {
    if (this.customerId) {
      this.router.navigate(['/customer-profile', this.customerId]);
    }
  }
  placeOrder(): void {
    this.router.navigate(['/confirmationpage']);
  }

  handleTabChange(tab: string) {
    this.activeTab = tab;
  }

}

