
import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menuVisible: boolean = false;

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }
  closeMenu() {
    this.menuVisible = false;
  }

   @HostListener('document:click', ['$event'])
    closeMenuOnClickOutside(event: Event) {
      const menu = document.querySelector('.menu');
      const hamburguer = document.querySelector('.hamburger-button');

      if (this.menuVisible && menu && !menu.contains(event.target as Node) && hamburguer && !hamburguer.contains(event.target as Node)) {
        this.menuVisible = false;
      }
    }
}
