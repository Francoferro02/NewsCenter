import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private usuarioAutenticado: boolean = false;

  // Método para verificar si el usuario está autenticado
  isUsuarioAutenticado(): boolean {
    return this.usuarioAutenticado;
  }

  // Método para autenticar al usuario (puedes implementar lógica de autenticación real aquí)
  autenticarUsuario(): void {
    this.usuarioAutenticado = true;
  }

  desAutenticar(): void{
    this.usuarioAutenticado = false;
  }
}