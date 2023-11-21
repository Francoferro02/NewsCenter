import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthServiceService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService. isUsuarioAutenticado()) {
      return true;
    } else {
      // Si el usuario no está autenticado, redirige a la página de LastNews
      this.router.navigate(['/LastNews']);
      return false;
    }
  }
  
}