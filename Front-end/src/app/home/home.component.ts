import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {
  VegLollipop : string = "assets/images/veg-Lollipop.jpg";
  EggBiryani : string = "assets/images/egg-biryani.jpg";
  Cake : string = "assets/images/cake.jpg";
  ChilliChicken : string = "assets/images/chilli-chicken.jpg";
  Burger : string = "assets/images/burger.jpg";

  @ViewChild('carousel', {static: false}) carousel: ElementRef | undefined;
  
  constructor() { }

  ngAfterViewInit(): void {
    this.startSlideInterval();
  }

  startSlideInterval() {
    setInterval(() => {
      this.nextSlide();
    }, 500);
  }

  nextSlide() {
    if (this.carousel) {
      this.carousel.nativeElement.carousel('next');
    }
  }


}



