import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { TokenserviceService } from '../../shared/tokenservice.service';

@Component({
  selector: 'app-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {

    customerId = parseInt(this.tokenservice.getUser());
  authHeader = this.tokenservice.getHeaderObject();
//   customerId: number = parseInt(sessionStorage.getItem('UserId'));
//   customerToken: string | null = sessionStorage.getItem('Token');
  isLoggedIn: boolean = false;

  cities: any[] = [];
  customerDetails: any = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    userName: ''
  };

  customerAddress: any = {
    addressId: 0,
    customerId: 0,
    houseNumber: '',
    buildingName: '',
    locality: '',
    cityId: 0,
    landMark: '',
    city: {
      cityId: 0,
      name: '',
      stateId: 0,
      state: null
    }
  };

  orderHistory: any[] = [];
  deliveryPartner: any = {
    partnerId: 0,
    name: '',
    phone: '',
    email: '',
    cityId: 0,
    userName: ''
  };

  selectedRating: number = 0;
  feedback: string = '';

  constructor(private http: HttpClient,private tokenservice : TokenserviceService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.authHeader;
    this.fetchCities();
    this.fetchCustomerDetails();
    this.fetchCustomerAddress();
    this.fetchOrderHistory();
  }

  fetchCities(): void {
    const url='http://localhost:36000/api/Customer/GetAllCities'
    this.http.get<any[]>(url,this.authHeader)
      .subscribe(response => {
        this.cities = response;
      }, error => {
        console.log(error);
      });
  }

  fetchCustomerDetails(): void {
    const url=`http://localhost:36000/api/Customer/GetCustomerDetails?customerId=${this.customerId}`
    this.http.get<any>(url, this.authHeader)
      
    .subscribe(response => {
      this.customerDetails = response;
    }, error => {
      console.log(error);
    });
}

  fetchCustomerAddress(): void {
    this.http.get<any>(`http://localhost:36000/api/Customer/address/${this.customerId}`, this.authHeader
    ).subscribe(response => {
      this.customerAddress = response;
    }, error => {
      console.log(error);
    });
  }

  fetchOrderHistory(): void {
    this.http.get<any[]>(`http://localhost:36000/api/Customer/ViewOrderHistoryForCustomer?customerId=${this.customerId}`, this.authHeader
      
    ).subscribe(response => {
      this.orderHistory = response;
    }, error => {
      console.log(error);
    });
  }

  handleProfileChange(fieldName: string, value: any) {
    this.customerDetails[fieldName] = value;
  }

  handleAddressChange(fieldName: string, value: any) {
    this.customerAddress[fieldName] = value;
  }

  editCustomerDetails(): void {
    this.http.put<any>('http://localhost:36000/api/Customer/UpdateCustomerDetails', this.customerDetails, this.authHeader
      
    ).subscribe(response => {
      alert('Profile details updated successfully');
    }, error => {
      console.log(error);
    });
  }

  editCustomerAddress(): void {
    this.http.put<any>(`http://localhost:36000/api/Customer/address/${this.customerAddress.addressId}`, this.customerAddress, this.authHeader
      
    ).subscribe(response => {
      alert('Address updated successfully');
    }, error => {
      console.log(error);
    });
  }
  canCancelOrder(status: string): boolean {
    return status === 'pending' || status === 'processing';
}


  cancelOrder(orderId: number): void {
    this.http.put<any>(`http://localhost:36000/api/Customer/CancelOrderFromCustomer?orderId=${orderId}`, {}, this.authHeader
      
    ).subscribe(response => {
      console.log('Order canceled successfully');
      this.fetchOrderHistory(); // Refresh order history after cancellation
    }, error => {
      console.log(error);
    });
  }

  fetchPartnerDetails(partnerId: number): void {
    this.http.get<any>(`http://localhost:36000/api/DeliveryPartner/GetDetails?partnerId=${partnerId}`)
      .subscribe(response => {
        this.deliveryPartner = response;
      }, error => {
        console.log(error);
      });
  }

  handleRatingChange(value: number): void {
    this.selectedRating = value;
  }

  changeFeedback(event: any): void {
    this.feedback = event.target.value;
  }

  handleCityChange(event: any) {
    const selectedCityId = event.target.value;
    console.log('Selected city ID:', selectedCityId);
    
  }

  submitFeedback(restaurantId: number): void {
    const customerReview = {
      customerId: this.customerId,
      restaurantId: restaurantId,
      rating: this.selectedRating,
      textReview: this.feedback
    };

    this.http.post<any>('http://localhost:36000/api/Customer/review', customerReview, this.authHeader
    ).subscribe(response => {
      console.log('Feedback submitted successfully');
    }, error => {
      console.log(error);
    });
  }
}
