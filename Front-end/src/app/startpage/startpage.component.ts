import { Component } from '@angular/core';

@Component({
  selector: 'app-startpage',
  templateUrl: './startpage.component.html',
  styleUrl: './startpage.component.css'
})
export class StartpageComponent {
  adminpic : string = "assets/images/adminpage.png";
  userpic : string = "assets/images/userpage.png";
  rowner : string = "assets/images/rowner.png";
  deliverypartner : string = "assets/images/DeliveryStatus.jpg";

}
