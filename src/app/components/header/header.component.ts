import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductPhotoService } from '../../services/productPhotoService/product-photo.service';
import { DiscountService } from '../../services/discountService/discount.service';
@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  imports: [RouterModule],
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isShow: boolean = false;
  constructor(private discountService:DiscountService){
    this.discountService.getDiscountImage().subscribe({
      next: (data) => {
        if(data.length!=0){
          this.discountPhotoUrl = data.imageUrl
        }
      }
    })
  }
  discountPhotoUrl:string=''
  topPosToStartShowing = 100; // Scroll position to start showing the button

  // Listen to window scroll event to check if we need to show the button
  @HostListener('window:scroll')
  checkScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    // Show or hide the button based on scroll position
    this.isShow = scrollPosition >= this.topPosToStartShowing;
  }

  // Smooth scroll to the top of the page
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
