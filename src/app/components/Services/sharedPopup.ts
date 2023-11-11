import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Noticia } from 'src/app/models/noticia.model'; // Importa el modelo de Noticia

@Injectable({
  providedIn: 'root',
})
export class SharedPopupService {
  private selectedNoticiaSource = new BehaviorSubject<Noticia | null>(null);
  selectedNoticia$ = this.selectedNoticiaSource.asObservable();
  private busquedaDesdeNavBar: boolean = false;
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

  
}
