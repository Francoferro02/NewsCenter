import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Noticia } from 'src/app/models/noticia.model';
import { Input } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class LastNewsService implements OnInit {
  @Input() listadoNoticiasDestacas: any;
  private pais: string = 'us'; // Nuevo
  private listadoNoticiasDestacasSubject = new BehaviorSubject<any>(null);
  constructor(private http: HttpClient) { }

  ngOnInit() {
    

  }


  fetchAndDisplayPosts(): Observable<any> {
    
    const url = `https://newsapi.org/v2/top-headlines?country=${this.pais}&apiKey=e88601fed28f488b8bbaf8c0d51cf962`;
  
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

  setFiltradoDestacadas(pais: string) {
    this.pais = pais;

  }


}

