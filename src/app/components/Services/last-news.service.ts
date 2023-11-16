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
  private pais: string = ''; // Nuevo
  private categoria: string = 'general';
  private language: string = 'en'; 
  private listadoNoticiasDestacasSubject = new BehaviorSubject<any>(null);
  constructor(private http: HttpClient) { }

  ngOnInit() {
    

  }


  fetchAndDisplayPosts(): Observable<any> {
    let url: string;
  
    // Verifica si hay una categoría específica
    if (this.categoria === 'general') {
      // Si hay una categoría general y se ha seleccionado un país, incluye el parámetro country
      if (this.pais) {
        url = `https://newsapi.org/v2/top-headlines?category=${this.categoria}&country=${this.pais}&apiKey=12c5c9726e834cbbbaf33d1e05ae1efc`;
      } else {
        // Si no se ha seleccionado un país, excluye el parámetro country
        url = `https://newsapi.org/v2/top-headlines?language=${this.language}&apiKey=12c5c9726e834cbbbaf33d1e05ae1efc`;
      }
    } else {
      // Si hay una categoría específica, incluye el parámetro category y, si aplica, country
      url = `https://newsapi.org/v2/top-headlines?category=${this.categoria}&${this.pais ? `country=${this.pais}&` : ''}apiKey=12c5c9726e834cbbbaf33d1e05ae1efc`;
    }
  
    return this.http.get(url);
  }
  

  getListadoNoticiasDestacasObservable(): Observable<Noticia[]> {
    return this.fetchAndDisplayPosts().pipe(
      map((response: any) => {
        if (response && response.articles && Array.isArray(response.articles)) {
          return response.articles
            .filter((article: any) =>  article.title) // Filtrar noticias sin imagen o título
            .map((article: any) => {
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

  setCategoria(categoria: string) {
    this.categoria = categoria;
  }
}

