import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isShow: boolean = false;
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
