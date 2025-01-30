import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'crm-restaurant';


  //configuración de la visivilidad del componente header y footer. En el componente home no deberán mostrarse pero en el resto de rutas sí.
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