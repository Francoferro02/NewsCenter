import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LastNewsService {
  private filtradoDestacadas: string = 'top-headlines';
 
 constructor(private http:HttpClient){}

  

  fetchAndDisplayPosts(): Observable<any> {
    const url = `https://newsapi.org/v2/${this.filtradoDestacadas}?language=en&apiKey=12c5c9726e834cbbbaf33d1e05ae1efc`
    
    return this.http.get(url);
  }
  
  setFiltradoDestacadas(filtrado: string) {
    // Actualiza el valor del filtrado en función de la selección del usuario
    // Por ejemplo, puedes almacenar el valor en una propiedad privada y usarlo en la función fetchAndDisplayPosts.
    this.filtradoDestacadas = filtrado;
    // Luego, llamas a la función fetchAndDisplayPosts con el nuevo valor de filtrado.
    this.fetchAndDisplayPosts();
  }



  /*  */


}




