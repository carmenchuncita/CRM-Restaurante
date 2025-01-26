import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Component, inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {


  private activatedRoute: ActivatedRoute = inject(ActivatedRoute)
  private authService: AuthService = inject(AuthService)
  /*private router: Router = inject(Router)*/
  public id!: string;
  public userData:  any = { user: {} };
  

  ngOnInit(){

    this.activatedRoute.params.subscribe(params => {

      //A diferencia de el ejemplo anterior, 
      // el id lo almacenamos en una variable con alcance global, por que luego lo utilizaremos cuando enviemos el objeto a editar
      this.id = params['id'];
      this.authService.profileUser().subscribe({
        next: (data: any) => {
          console.log(data)
          this.userData = data
          if(this.userData.user_id === 'id'){
            return true
          }
          return false        
        },
        error: (error: any) => {
          console.log(error)
        }
      })
    });
  }
  
    }




  


