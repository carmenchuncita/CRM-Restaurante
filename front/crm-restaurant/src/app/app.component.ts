import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs, 'es-ES');

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [
    { provide: 'LOCALE_ID', useValue: 'es-ES' }
  ],
})
export class AppComponent implements OnInit {
  title = 'crm-restaurant';

  // Configuración de la visibilidad del header y footer en función de la ruta
  private router: Router = inject(Router);
  public showHeader: boolean = true;
  public showFooter: boolean = true;

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentRouter = event.urlAfterRedirects;
        console.log('Ruta después del redireccionamiento:', currentRouter); // Verifica la URL después de redirigir

        if (currentRouter.startsWith('/home')) {
          this.showHeader = false;
          this.showFooter = false;
        } else {
          this.showHeader = true;
          this.showFooter = true;
        }
      }
    });
  }
}
