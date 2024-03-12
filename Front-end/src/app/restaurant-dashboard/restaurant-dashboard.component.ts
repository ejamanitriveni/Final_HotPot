import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { TokenserviceService } from '../shared/tokenservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';


interface Restaurant {
  restaurantId: number;
  restaurantName: string;
  email: string;
  phone: string;
  restaurantImage: string;
}

interface Category {
  categoryName: string;
  restaurantId: number;
}

@Component({
  selector: 'app-restaurant-dashboard',
  templateUrl: './restaurant-dashboard.component.html',
  styleUrl: './restaurant-dashboard.component.css'
})
export class RestaurantDashboardComponent {

    menus: any[] = [];
    restaurants: Restaurant[] = [];
    filteredRestaurants: Restaurant[] = [];
    allReviews: any[] = [];
    categories: Category[] = [];
    searchedRestaurants: Restaurant[] = [];
    searchQuery: string = '';
    selectedCategory: string = 'all';
    selectedName: string = ''; // Assign your selected name here
    averageRatings: { [key: number]: number } = {};
    userId = parseInt(this.tokenservice.getUser());
    authHeader = this.tokenservice.getHeaderObject();
  
    constructor(private http: HttpClient, private tokenservice : TokenserviceService, private route: ActivatedRoute,
      private router: Router) { }
  
    ngOnInit(): void {
      this.fetchRestaurants();
      // this.fetchCategories();
      // this.fetchAllReviews();
    }
  
    fetchRestaurants(): void {
      
      const restoURL = `http://localhost:36000/api/Customer/GetAllRestaurants`;
      this.http.get<any[]>(restoURL,this.authHeader)
        .subscribe(response => {
          console.log(response)
          this.restaurants = response;
          this.filteredRestaurants = response;
          console.log(this.restaurants);
          this.calculateAverageRatings();
        }, error => {
          console.error('Error fetching Restaurants:', error);
        });
    }
  
    fetchCategories(): void {
      this.http.get<any[]>('http://localhost:36000/api/Restaurant/GetSpecialities',this.authHeader)
        .subscribe(response => {
          console.log(response)
          this.categories = response;
          this.filteredRestaurants = response;
        }, error => {
          console.error(error);
        });
    }
  
    fetchAllReviews(): void {
      this.http.get<any[]>('http://localhost:36000/api/Restaurant/GetAllReviews')
        .subscribe(response => {
          this.allReviews = response;
        }, error => {
          console.error(error);
        });
    }
  
    calculateAverageRatings(): void {
      this.restaurants.forEach(restaurant => {
        const ratingsForRestaurant = this.allReviews.filter(review => review.restaurantId === restaurant.restaurantId);
        const totalRating = ratingsForRestaurant.reduce((acc, curr) => acc + curr.rating, 0);
        const avgRating = totalRating / ratingsForRestaurant.length;
        this.averageRatings[restaurant.restaurantId] = avgRating;
      });
    }
    
  
  
    // handleSearchChange(event: Event): void {
    //   this.searchQuery = (event.target as HTMLInputElement).value;
    //   this.fetchRestaurants();
    //   this.filterRestaurants();
    // }
    search = new FormControl('');

    searchRestaurants(): void {
      const searchQuery = this.search?.value;
      console.log(searchQuery);
      const url = `http://localhost:36000/api/Customer/GetAllRestaurants?searchQuery=${searchQuery}`;
      this.http.get<any>(url, this.authHeader)
        .subscribe(response => {
          console.log(response);
          this.restaurants = response;
          this.filteredRestaurants = response;
          console.log(this.restaurants);
        },
        error => {
          console.error('Error fetching Restaurant items:', error);
        }
      );
      
    }
  
    handleCategoryChange(event: Event): void {
      this.selectedCategory = (event.target as HTMLSelectElement).value;
      this.filterRestaurants();
    }
    trackByRestaurantId(index: number, restaurant: any): number {
      return restaurant.restaurantId;
  }
  
    filterRestaurants(): void {
      if (this.searchQuery.trim() !== '') {
        this.searchedRestaurants = this.restaurants.filter(restaurant => restaurant.restaurantName.toLowerCase().includes(this.searchQuery.toLowerCase()));
      } else {
        this.searchedRestaurants = [];
      }
  
      if (this.selectedCategory === 'all') {
        this.filteredRestaurants = this.restaurants;
      } else {
        const specialityRestos = this.categories.filter(category => category.categoryName.toLowerCase() === this.selectedCategory.toLowerCase());
        const specialityRestoIds = specialityRestos.map(r => r.restaurantId);
        this.filteredRestaurants = this.restaurants.filter(restaurant => specialityRestoIds.includes(restaurant.restaurantId));
      }
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
          }
        );
    }
   


}