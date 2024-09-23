import { Component, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from "../login/login.component";
import { RegisterComponent } from "../register/register.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, LoginComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    document.addEventListener('DOMContentLoaded', function () {
   
      var dropdownSubmenus = document.querySelectorAll('.dropdown-submenu');

      dropdownSubmenus.forEach(function (submenu) {
        submenu.addEventListener('mouseover', function () {
          var submenuDropdown = submenu.querySelector('.dropdown-menu');
          if (submenuDropdown) {
            submenuDropdown.classList.add('show');
          }
        });

        submenu.addEventListener('mouseout', function () {
          var submenuDropdown = submenu.querySelector('.dropdown-menu');
          if (submenuDropdown) {
            submenuDropdown.classList.remove('show');
          }
        });
      });
    });
  }
}
