import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { User } from 'src/app/entities/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  user: User;
  // Usuario autenticado por red social
  userSocial: SocialUser;
  loggedIn: boolean;
  
  constructor(private authSocialService: SocialAuthService, private authService: AuthService,private router: Router) {
    this.user = new User();
  }

  ngOnInit(): void {
    // Se hace la peticion al servicio de autenticación
    this.authSocialService.authState.subscribe((user) => {
      // Se guarda el usuario autenticado
      this.userSocial = user;
      this.loggedIn = (user != null);
      // Si hay un usuario autenticado
      if(this.loggedIn){
        // Se almacane el nombre y la foto en el localstorage
        localStorage.setItem('name',this.userSocial.name);
        localStorage.setItem('photoUrl',this.userSocial.photoUrl);
        // Se redirecciona a la carpeta posts
        this.router.navigate(['/posts']);

        this.verificarUsuario();
      }
    });
  }

  /**
   * Permite hacer la autenticación mediante gmail
   */
  singInsignInWithGoogle(): void {
    this.authSocialService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  /**
   * Permite hacer la autenticación con facebook
   */
  signInWithFB(): void {
    this.authSocialService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  /**
   * Permite cerrar cesión de gmail y de facebook
   */
  signOut(): void {
    this.authSocialService.signOut();
  }

  verificarUsuario(){

    // Dato aleatoria para el correo 
    let numero = Math.floor(Math.random() * (1000000 - 1)) + 4

    this.user.name = this.userSocial.name;
    this.user.email = `fakepruebagluky${numero}@gmail.com`;
    this.user.gender = "Male";
    this.user.status = "Active";

    // Se obtiene la variable userID del localstorage
    let userId = localStorage.getItem('userId');
    // En caso de que no exista la variable en el userID es porque están ingresando por primer vez
    if(userId === 'undefined' || !userId){
      // Se agrega un nuevo usuario
      this.addUser(this.user);
      
    }else{
      this.authService.getById(userId).subscribe((response: User)=>{
        // en caso de que el usuario existe, es porque no lo han borrado
        if(response['code']===200 ){
          console.log('Si existe el usuario');
        }else{
          // Si no existe, es porque ya lo borraron
          if(response['code']===404){
            // Se registra un nuevo usuario
            this.addUser(this.user);
          }
        }
      });
    }
  }

  /**
   * Permite crear un nuevo usuario
   * @param user 
   */
  addUser(user:User){
    this.authService.add(this.user).subscribe(
      (data: User) => {
        localStorage.setItem('userId',data['data'].id);
      }
  )}

}
