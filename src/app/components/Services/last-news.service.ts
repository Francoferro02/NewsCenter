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
    console.log(this.pais);
    console.log(this.categoria);
    console.log(this.language)
    // Verifica si hay una categoría específica
    if (this.categoria === 'general') {
      // Si hay una categoría general y se ha seleccionado un país, incluye el parámetro country
      if (this.pais && this.pais !== 'wd') {
        url = `https://newsapi.org/v2/top-headlines?category=${this.categoria}&country=${this.pais}&apiKey=506f9030df57473095658d41f2da32f2`;
        /* otra apikey 506f9030df57473095658d41f2da32f2 */
      } 
      else if(this.pais === 'wd'){
        url = `https://newsapi.org/v2/top-headlines?language=en&apiKey=506f9030df57473095658d41f2da32f2`;
      }
      else if(this.pais === ' '){
        // Si no se ha seleccionado un país, excluye el parámetro country
        url = `https://newsapi.org/v2/top-headlines?category=general&language=en&apiKey=506f9030df57473095658d41f2da32f2`;

      }
      else{
        url = `https://newsapi.org/v2/top-headlines?category=general&language=en&apiKey=506f9030df57473095658d41f2da32f2`;
      }
    } else {
      // Si hay una categoría específica, incluye el parámetro category y, si aplica, country
      url = `https://newsapi.org/v2/top-headlines?category=general&language=en&apiKey=506f9030df57473095658d41f2da32f2`;
    }
    
    console.log(url);
    return this.http.get(url);
    
  }
  

  getListadoNoticiasDestacasObservable(): Observable<Noticia[]> {
    return this.fetchAndDisplayPosts().pipe(
      map((response: any) => {
        if (response && response.articles && Array.isArray(response.articles)) {
          return response.articles
            .filter((article: any) =>  article.title !== "[Removed]" ) // Filtrar noticias sin imagen o título
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

