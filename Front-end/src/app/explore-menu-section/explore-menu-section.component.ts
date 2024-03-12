import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenserviceService } from '../shared/tokenservice.service';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
// import axios from 'axios';
// import { AuthService } from '../../services/auth.service';
// import { Store, select } from '@ngrx/store';
// import { selectIsLoggedIn } from '../../store/selectors/auth.selectors';

@Component({
  selector: 'app-explore-menu-section',
  templateUrl: './explore-menu-section.component.html',
  styleUrl: './explore-menu-section.component.css'
})


export class ExploreMenuSectionComponent implements OnInit {

  menuItems: any[] = [];
  filteredMenuItems: any[] = [];
  selectedCategory: string = 'all';
  searchQuery: string = '';
  searchedItems: any[] = [];
  @ViewChild('sliderRef', { static: false }) sliderRef: any;
  restaurantId = 1;
  // userId: string = '';
  carts: any[] = [];
  isLoggedIn$: Observable<boolean>;
  customerToken: string | null = '';
  customerId: string | null = '';
  userId = parseInt(this.tokenservice.getUser());
  authHeader = this.tokenservice.getHeaderObject();
  cartNotEmpty: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tokenservice : TokenserviceService,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    // this.fetchMenuItems();
    this.fetchMenuItems();
    
  }

  fetchCartItems(): void {
    
    const url = `http://localhost:36000/api/Customer/ViewCart?userId=${this.userId}`;
    this.http.get<any[]>(url, this.authHeader)
      .subscribe(
        response => {
          console.log(response)
          this.carts = response;
          this.cartNotEmpty = this.carts.length > 0;
        },
        error => {
          console.log(error);
          this.cartNotEmpty = false;
        }
      );
  }

  fetchMenuItems(): void {
    
    const url = `http://localhost:36000/api/Customer/GetAllMenus`;
    this.http.get<any>(url, this.authHeader)
      .subscribe(response => {
        console.log(response);
        this.menuItems = response;
        this.filteredMenuItems = response;
        console.log(this.menuItems);
      },
      error => {
        console.error('Error fetching menu items:', error);
      }
    );
  }

  filterMenuItems(): void {
    if (this.selectedCategory === 'all') {
      this.filteredMenuItems = this.menuItems;
    } else {
      this.filteredMenuItems = this.menuItems.filter(item => item.cuisine.toLowerCase() === this.selectedCategory.toLowerCase());
    }
  }
  search = new FormControl('');

  searchMenuItems(): void {
    const searchQuery = this.search?.value;
    console.log(searchQuery);
    const url = `http://localhost:36000/api/Customer/GetAllMenus?searchQuery=${searchQuery}`;
    this.http.get<any>(url, this.authHeader)
      .subscribe(response => {
        console.log(response);
        this.menuItems = response;
        this.filteredMenuItems = response;
        console.log(this.menuItems);
      },
      error => {
        console.error('Error fetching menu items:', error);
      }
    );
    
  }

  handleCategoryFilter(event: any): void {
    this.selectedCategory = event.target.value;
    this.filterMenuItems();
  }

  handleSearch(): void {
    const url = `http://localhost:36000/api/Customer/menu/search?restaurantId=${this.restaurantId}&query=${this.searchQuery}`;
    this.http.get<any>(url, this.authHeader)
      .subscribe(response => {
        this.searchedItems = response.data;
      },
      error => {
        console.error('Error searching menu items:', error);
      }
    );
  }
  
//   handleAddToCart(menuItemId: string): void {
//     const headers = new Headers();
//     headers.append('Authorization', 'Bearer' + this.tokenservice.getToken())
//     console.log(this.tokenservice.getToken());
//     if (this.tokenservice.isLoggedIn()) {
//       this.http.post(`http://localhost:36000/api/Customer/AddToCart?userId=${this.tokenservice.getUser()}&menuItem=${menuItemId}`, this.tokenservice.getHeaderObject()).subscribe({
//         next: data => {
//           this.carts = data as any[];
//           console.log(data);
//         },
//         error: err => {
//           console.log(err);
//         }
//       });
//   }
// }

handleAddToCart(menuItemId: string): void {
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
        alert("Item Added to Cart !");
      },
      error: err => {
        console.log(err);
      }
    });
}
}

  // handleRemoveFromCart(cartId: string): void {
  //   const deleteCart = `http://localhost:36000/api/Customer/DeleteCartItem?cartId=${cartId}`;
  //   fetch(deleteCart, this.authHeader)
  //     .then(r => {
  //       if (r.ok) {
  //         this.carts = this.carts.filter(cart => cart.cartId !== cartId);
  //       }
  //     })
  //     .catch(e => console.error(e));
  // }

  handleNext(): void {
    this.sliderRef.slickNext();
  }

  handlePrev(): void {
    this.sliderRef.slickPrev();
  }


}

