import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenserviceService } from '../../shared/tokenservice.service';

@Component({
  selector: 'app-delivery-partner-profile',
  templateUrl: './delivery-partner-profile.component.html',
  styleUrl: './delivery-partner-profile.component.css'
})
export class DeliveryPartnerProfileComponent implements OnInit {
  activeTab: string = 'profile';
  partnerId = parseInt(this.tokenservice.getUser());
  authHeader = this.tokenservice.getHeaderObject();
  
  orders: any[] = [];
  orderStatuses: any[] = [];
  profile: any = {};

  constructor(private http: HttpClient,private tokenservice : TokenserviceService) { }

  ngOnInit(): void {
    this.fetchPartnerDetails();
    this.fetchOrders();
  }

  handleTabChange(tab: string): void {
    this.activeTab = tab;
  }

  fetchPartnerDetails(): void {
    const url=`http://localhost:36000/api/DeliveryPartner/GetDetails?partnerId=${this.partnerId}`
    if (this.partnerId) {
      this.http.get<any>(url,this.authHeader)
        .subscribe(
          response => {
            this.profile = response;
          },
          error => {
            console.error('Error fetching partner details:', error);
          }
        );
    }
  }

  fetchOrders(): void {
    if (this.partnerId) {
      this.http.get<any[]>(`http://localhost:36000/api/DeliveryPartner/GetAllOrders?partnerId=${this.partnerId}`,this.authHeader)
        .subscribe(
          response => {
            this.orders = response;
            this.orderStatuses = response.map(order => ({ orderId: order.orderId, status: order.status }));
          },
          error => {
            console.error('Error fetching orders:', error);
          }
        );
    }
  }

  handleProfileChange(fieldName: string, value: string): void {
    this.profile[fieldName] = value;
  }

  editPartnerDetails(): void {
    const requestOptions = {
      headers: { 'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authHeader },
    };

    this.http.put<any>('http://localhost:36000/api/DeliveryPartner/UpdateDetails', this.profile,requestOptions)
      .subscribe(
        response => {
          alert('Details updated successfully!');
        },
        error => {
          console.error('Error updating partner details:', error);
        }
      );
  }
  isOrderOnTheWay(order: any): boolean {
    return order.status === 'On the way' || order.status === 'on the way';
  }

  isOrderNotOnTheWay(order: any): boolean {
    return !this.isOrderOnTheWay(order);
  }

  getOrderStatus(order: any): string {
    const foundStatus = this.orderStatuses.find(status => status.orderId === order.orderId);
    return foundStatus ? foundStatus.status : '';
  }
  
  handleChangestatus(orderId: string): void {
    this.http.put<any>(`http://localhost:36000/api/DeliveryPartner/ChangeOrderStatus?orderId=${orderId}`,this.authHeader, {})
      .subscribe(
        response => {
          const updatedOrders = this.orders.map(order => {
            if (order.orderId === orderId) {
              return { ...order, status: 'delivered' };
            }
            return order;
          });
          this.orders = updatedOrders;
          // Update the status for the selected order in orderStatuses
          this.orderStatuses = this.orderStatuses.map(status => {
            if (status.orderId === orderId) {
              return { ...status, status: 'delivered' };
            }
            return status;
          });
          alert('Status updated successfully');
        },
        error => {
          console.error('Error changing order status:', error);
          alert('A problem occurred while updating the status');
        }
      );
  }
}

