import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  menuOpen: boolean = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }


  @HostListener('document:click', ['$event'])
  closeMenuOnClickOutside(event: Event) {
    const menu = document.querySelector('.menu');
    const hamburguer = document.querySelector('.hamburguer');

    if (this.menuOpen && menu && !menu.contains(event.target as Node) && hamburguer && !hamburguer.contains(event.target as Node)) {
      this.menuOpen = false;
    }
  }
}
