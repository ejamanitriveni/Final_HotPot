import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenserviceService } from '../shared/tokenservice.service';
import { Observable } from 'rxjs/internal/Observable';

interface MenuItem {
price: number;
  menuId: number;
  name: string;
  itemImage: string;
  description: string;
  cuisine: string;
}
interface Restaurant {
  RestaurantId: number;
  RestaurantName: string;
  Email: string;
  Phone: string;
  RestaurantImage: string;
}

interface Category {
  categoryName: string;
  restaurantId: number;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  carts: any[] = [];
  isLoggedIn$: Observable<boolean>;
  customerToken: string | null = '';
  customerId: string | null = '';
  userId = parseInt(this.tokenservice.getUser());
  authHeader = this.tokenservice.getHeaderObject();

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private tokenservice : TokenserviceService)
    {}

  





  menuItems: MenuItem[] = [];
  selectedCategory: string = 'all';

  
  RestaurantId: number;

  

  ngOnInit(): void {
    
    
      this.fetchMenuItems(1);
    
    
  }

  fetchMenuItems(RestaurantId: number): void {
    const apiUrl = `http://localhost:36000/api/Customer/GetMenuByRestaurant?restaurantId=${RestaurantId}`;
    this.http.get<MenuItem[]>(apiUrl)
      .subscribe(response => {
        this.menuItems = response;
      }, error => {
        console.error('Error fetching menu items:', error);
      });
  }
  handleAddToCart(menuItemId: number): void {
    const requestOptions = {
      headers: { 'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authHeader},
    };
    
    console.log(this.tokenservice.getToken());
    if (this.tokenservice.isLoggedIn()) {
      this.http.post<any>(`http://localhost:36000/api/Customer/AddToCart?userId=${this.tokenservice.getUser()}&menuItem=${menuItemId}`, requestOptions).subscribe({
        next: data => {
          this.carts = data as any[];
          console.log(data);
        },
        error: err => {
          console.log(err);
        }
      });
  }
  }
  

  
  handleCategoryClick(category: string): void {
    this.selectedCategory = category;
  }
}
