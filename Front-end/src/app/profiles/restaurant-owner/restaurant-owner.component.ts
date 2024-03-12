
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenserviceService } from '../../shared/tokenservice.service';
@Component({
  selector: 'app-restaurant-owner',
  templateUrl: './restaurant-owner.component.html',
  styleUrl: './restaurant-owner.component.css'
})

export class RestaurantOwnerComponent implements OnInit {
  activeTab: string = 'orders';
  orders: any[] = [];
  payments: any[] = [];
  orderStatuses: any[] = [];
  newMenu: any = {
    name: '',
    type: 'Veg',
    price: '',
    description: '',
    cuisine: 'Main Course',
    tasteInfo: '',
    itemImage: '',
    nutritionId: 1,
    restaurantId: JSON.parse(sessionStorage.getItem('userdata')).restaurantId // Set restaurantId statically for now
  };
  menus: any[] = [];
  selectedMenuId: any;
  error: string | null = null;
  customerId = parseInt(this.tokenservice.getUser());
  authHeader = this.tokenservice.getHeaderObject();

  constructor(private http: HttpClient, private tokenservice : TokenserviceService) {}

  ngOnInit(): void {
    this.fetchMenus();
    this.fetchOrders();
    this.fetchPayments();
  }

  fetchMenus() {
    const url = 'http://localhost:36000/api/Customer/GetMenuByRestaurant?restaurantId=1';
    this.http.get<any[]>(url, this.authHeader)
      .subscribe(
        (response) => {
          this.menus = response;
        },
        (error) => {
          console.error('Error fetching menus:', error);
          this.error = 'Error fetching menus. Please try again.';
        }
      );
  }

  handleMenuSubmit() {
    const url = 'http://localhost:36000/api/Restaurant/AddMenuItem'
    const restaurantid = JSON.parse(sessionStorage.getItem('userdata')).restaurantId;
    this.http.post<any>(url, this.newMenu)
      .subscribe(
        (response) => {
          console.log('Menu added:', response);
          this.fetchMenus(); // Refresh menus after adding new menu item
          // Reset form fields
          this.newMenu = {
            name: '',
            type: 'Veg',
            price: '',
            description: '',
            cuisine: 'Main Course',
            tasteInfo: '',
            itemImage: '',
            nutritionId: 1,
            restaurantId: restaurantid,
          };
          this.error = null; // Clear any previous errors
        },
        (error) => {
          console.error('Error adding menu:', error);
          this.error = 'Error adding menu. Please try again.'; // Set error message
        }
      );
  }

  handleDeleteMenu() {
    this.http.delete(`http://localhost:36000/api/Restaurant/DeleteMenuItem?menuId=${this.selectedMenuId}`)
      .subscribe(
        () => {
          alert('Menu Item deleted successfully');
          this.fetchMenus(); // Refresh menus after deleting menu item
          this.selectedMenuId = null;
          this.error = null; // Clear any previous errors
        },
        (error) => {
          console.error('Error deleting menu:', error);
          this.error = 'Error deleting menu. Please try again.';
        }
      );
  }

  fetchOrders() {
    const restaurantid = JSON.parse(sessionStorage.getItem('userdata')).restaurantId;
    this.http.get<any[]>(`http://localhost:36000/api/Restaurant/GetAllOrdersByRestaurant?restaurantId=${restaurantid}`)
      .subscribe(
        (response) => {
          this.orders = response;
          this.orderStatuses = response.map(order => ({ orderId: order.orderId, status: order.status }));
        },
        (error) => {
          console.error('Error fetching orders:', error);
        }
      );
  }

  fetchPayments() {
    const restaurantid = JSON.parse(sessionStorage.getItem('userdata')).restaurantId
    this.http.get<any[]>(`http://localhost:36000/api/Restaurant/GetAllPaymentsByRestaurants?restaurantId=${restaurantid}`)
      .subscribe(
        (response) => {
          this.payments = response;
        },
        (error) => {
          console.error('Error getting payments:', error);
        }
      );
  }

  handleChangestatus(orderId: any, newStatus: any) {
    this.http.put(`http://localhost:36000/api/Restaurant/ChangeOrderStatus?orderId=${orderId}&newStatus=${newStatus}`, {})
      .subscribe(
        () => {
          const updatedOrders = this.orders.map(order => {
            if (order.orderId === orderId) {
              return { ...order, status: newStatus };
            }
            return order;
          });
          this.orders = updatedOrders;
          // Update the status for the selected order in orderStatuses
          this.orderStatuses = this.orderStatuses.map(status => {
            if (status.orderId === orderId) {
              return { ...status, status: newStatus };
            }
            return status;
          });
          alert('Status updated successfully');
        },
        (error) => {
          console.error('Error changing order status:', error);
          alert('A problem occurred while updating the status');
        }
      );
  }

  handleTabChange(tab: string) {
    this.activeTab = tab;
  }
}

