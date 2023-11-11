import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import {BehaviorSubject, Observable, map } from 'rxjs';
import { Noticia } from 'src/app/models/noticia.model';

@Injectable({
  providedIn: 'root',
})
export class LastNewsService {
  private idioma: string = 'en'; // Nuevo
  private pais: string = 'us'; // Nuevo
  private listadoNoticiasDestacasSubject = new BehaviorSubject<any>(null);
 constructor(private http:HttpClient){}

  

 fetchAndDisplayPosts(): Observable<any> {
  const url = `https://newsapi.org/v2/top-headlines?language=${this.idioma}&country=${this.pais}&apiKey=12c5c9726e834cbbbaf33d1e05ae1efc`;
  return this.http.get(url);
}

getListadoNoticiasDestacasObservable(): Observable<Noticia[]> {
  return this.fetchAndDisplayPosts().pipe(
    map((response: any) => {
      if (response && response.articles && Array.isArray(response.articles)) {
        return response.articles.map((article: any) => {
          return {
            urlToImage: article.urlToImage,
            title: article.title,
            content: article.content,
            url: article.url,
            comentario: [],
            rating: 0,
            CantidadCalificaciones: 0,
          } as Noticia;
        });
      } else {
        throw new Error('Respuesta de la API no válida.');
      }
    })
  );
}
  
  setFiltradoDestacadas(idioma: string, pais: string) {
    this.idioma = idioma;
    this.pais = pais;
    this.fetchAndDisplayPosts();
  }

}




