import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExploreMenuSectionComponent } from './explore-menu-section/explore-menu-section.component';
import { RestaurantDashboardComponent } from './restaurant-dashboard/restaurant-dashboard.component';
import { CartDisplayComponent } from './cart/cart-display/cart-display.component';
import { AdminSignUpComponent } from './registerforms/admin-sign-up/admin-sign-up.component';
import { SignInComponent } from './registerforms/user-sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './registerforms/user-sign-up/sign-up.component';
import { AdminSignInComponent } from './registerforms/admin-sign-in/admin-sign-in.component';
import { StartpageComponent } from './startpage/startpage.component';
import { RestaurantOwnerComponent } from './profiles/restaurant-owner/restaurant-owner.component';
import { ResOwnerSignInComponent } from './registerforms/res-owner-sign-in/res-owner-sign-in.component';
import { ResOwnerSignUpComponent } from './registerforms/res-owner-sign-up/res-owner-sign-up.component';
import { DeliveryPartnerProfileComponent } from './profiles/delivery-partner-profile/delivery-partner-profile.component';
import { CustomerProfileComponent } from './profiles/customer-profile/customer-profile.component';
import { DeliveryPartnerSignInComponent } from './registerforms/delivery-partner-sign-in/delivery-partner-sign-in.component';
import { DeliveryPartnerSignUpComponent } from './registerforms/delivery-partner-sign-up/delivery-partner-sign-up.component';
import { CheckoutpageComponent } from './checkoutpage/checkoutpage.component';
import { ThanYouComponent } from './than-you/than-you.component';
import { AdminpageComponent } from './profiles/adminpage/adminpage.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
{path:'home',component:HomeComponent},
{path:'explore-menu-section',component:ExploreMenuSectionComponent},
{path:'restaurant-dashboard',component:RestaurantDashboardComponent},
{path:'cart-display',component:CartDisplayComponent},
{path:'admin-sign-in',component:AdminSignInComponent},
{path:'admin-sign-up',component:AdminSignUpComponent},
{path:'user-sign-in',component:SignInComponent},
{path:'user-sign-up',component:SignUpComponent},
{path:'res-owner-sign-in',component:ResOwnerSignInComponent},
{path:'res-owner-sign-up',component:ResOwnerSignUpComponent},
{path:'startpage',component:StartpageComponent},
{path:'restaurant-owner',component:RestaurantOwnerComponent},
{path:'delivery-partner-profile',component:DeliveryPartnerProfileComponent},
{path:'customer-profile',component:CustomerProfileComponent},
{path:'customer-profile/:customerId',component:CustomerProfileComponent},
{path:'delivery-partner-sign-in',component:DeliveryPartnerSignInComponent},
{path:'delivery-partner-sign-up',component:DeliveryPartnerSignUpComponent},
{path:'checkoutpage',component:CheckoutpageComponent},
{path:'thank-you',component:ThanYouComponent},
{path:'adminpage',component:AdminpageComponent},
{path:'menu',component:MenuComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
