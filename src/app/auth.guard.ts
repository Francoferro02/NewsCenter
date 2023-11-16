import { Injectable } from '@angular/core';
import {  Router } from '@angular/router';
import { AuthServiceService } from './components/Services/auth-service.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  constructor(private authService: AuthServiceService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isUsuarioAutenticado()) {
      return true;
    } else {
      // Redirige a la página de inicio de sesión si el usuario no está autenticado
      console.log('popopopo');
      alert ('Please, Sign in!')
      return false;
    }
  }
}