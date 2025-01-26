import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'crm-restaurant';


  //configuración de la visivilidad del componente header y footer. En el componente home no deberán mostrarse pero en el resto de rutas sí.
  private router: Router = inject(Router);
  public showHeader: boolean = true;
  public showFooter: boolean = true; 

  ngOnInit(){
    this.router.events.subscribe(( event ) => {

      if(event instanceof NavigationEnd){

        const currentRouter = event.urlAfterRedirects;
        if(currentRouter === '/auth/profile'){ //pendiente cambiar por '/home ' cuando el componente esté creado.
          this.showHeader = false;
          this.showFooter = false;
        }else {
          this.showHeader = true;
          this.showFooter = true;
        }

      }

    })

  }
}
