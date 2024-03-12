import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ExploreMenuSectionComponent } from './explore-menu-section/explore-menu-section.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './registerforms/user-sign-up/sign-up.component';
import { SignInComponent } from './registerforms/user-sign-in/sign-in.component';
import { AdminLoginComponent } from './registerforms/admin-sign-up/admin-login.component';
import { AdminSignUpComponent } from './registerforms/admin-sign-up/admin-sign-up.component';
import { RestaurantDashboardComponent } from './restaurant-dashboard/restaurant-dashboard.component';
import { CartDisplayComponent } from './cart/cart-display/cart-display.component';
import { AddMenuComponent } from './add-menu/add-menu.component';
import { FooterSectionComponent } from './footer-section/footer-section.component';
import { HomeComponent } from './home/home.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AdminSignInComponent } from './registerforms/admin-sign-in/admin-sign-in.component';
import { StartpageComponent } from './startpage/startpage.component';
import { CustomerProfileComponent } from './profiles/customer-profile/customer-profile.component';
import { RestaurantOwnerComponent } from './profiles/restaurant-owner/restaurant-owner.component';
import { ResOwnerSignInComponent } from './registerforms/res-owner-sign-in/res-owner-sign-in.component';
import { ResOwnerSignUpComponent } from './registerforms/res-owner-sign-up/res-owner-sign-up.component';
import { DeliveryPartnerProfileComponent } from './profiles/delivery-partner-profile/delivery-partner-profile.component';import { DeliveryPartnerSignUpComponent } from './registerforms/delivery-partner-sign-up/delivery-partner-sign-up.component';
import { DeliveryPartnerSignInComponent } from './registerforms/delivery-partner-sign-in/delivery-partner-sign-in.component';
import { CheckoutpageComponent } from './checkoutpage/checkoutpage.component';
import { ThanYouComponent } from './than-you/than-you.component';
import { AdminpageComponent } from './profiles/adminpage/adminpage.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ExploreMenuSectionComponent,
    SignUpComponent,
    SignInComponent,
    AdminLoginComponent,
    AdminSignUpComponent,
    RestaurantDashboardComponent,
    CartDisplayComponent,
    AddMenuComponent,
    FooterSectionComponent,
    HomeComponent,
    
    AdminSignInComponent,
    StartpageComponent,
    CustomerProfileComponent,
    RestaurantOwnerComponent,
    ResOwnerSignInComponent,
    ResOwnerSignUpComponent,
    DeliveryPartnerProfileComponent,
    CustomerProfileComponent,
    DeliveryPartnerSignUpComponent,
    DeliveryPartnerSignInComponent,
    CheckoutpageComponent,
    ThanYouComponent,
    AdminpageComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
