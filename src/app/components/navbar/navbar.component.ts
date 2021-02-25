import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  // Variables para el nombre e imagen del usuario de google o facebook
  nameUsuario: string;
  photoUrlUsuario: string;
  // variable para el id del usuario en localstorage
  idUser: string;

  constructor(private authService: SocialAuthService, private router: Router) {
    // Se obtiene el ID registrado en el localstorage
    this.idUser = localStorage.getItem('userId');
    // Se obtienen las variables almacenadas en localstorage
    this.nameUsuario = localStorage.getItem('name');
    this.photoUrlUsuario = localStorage.getItem('photoUrl');
  }

  ngOnInit(): void {
  
  }
  /**
   * Permite cerrar cesión
   */
  signOut(): void {
    // Se llama el evento de cierre de cesíón de google o facebook
    this.authService.signOut()
        .then(success => {
            // Se redirecciona al inicio de sesión
            this.router.navigate(['/'])
            // Se eliminan las variables name y photoUrl del localstorage
            localStorage.removeItem('name')
            localStorage.removeItem('photoUrl')
        }).catch(error => console.log(error));
    
    
    
  }
}
