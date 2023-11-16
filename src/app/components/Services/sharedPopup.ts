import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Noticia } from 'src/app/models/noticia.model'; // Importa el modelo de Noticia
import { LoginFormComponent } from '../login-form/login-form.component';
@Injectable({
  providedIn: 'root',
})
export class SharedPopupService {
  private selectedNoticiaSource = new BehaviorSubject<Noticia | null>(null);
  selectedNoticia$ = this.selectedNoticiaSource.asObservable();
  private busquedaDesdeNavBar: boolean = false;

  private openPopupSource = new BehaviorSubject<boolean>(false);
  openPopupRegister$ = this.openPopupSource.asObservable();

  constructor() {}

  openPopup(noticia: Noticia) {
    this.selectedNoticiaSource.next(noticia);
  }

  setBusquedaDesdeNavBar(value: boolean) {
    this.busquedaDesdeNavBar = value;
  }
  
  getBusquedaDesdeNavBar() {
    return this.busquedaDesdeNavBar;
  }

  closePopup() {
    this.selectedNoticiaSource.next(null); // Establece selectedNoticia como null
  }

  openPopupRegister() {
    this.openPopupSource.next(true);
    
  }

  closePopupRegister() {
    this.openPopupSource.next(false);
  }
  
}
