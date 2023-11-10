import { HttpClient } from '@angular/common/http';
import { Injectable, Input, OnInit } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class componentApiService {
  private newsCache = new Map<string, ReplaySubject<any[]>>();
  private filtradoGridSeccion: string = 'top-headlines'; // Propiedad para almacenar el filtrado
  private categoria: string = ''; // Propiedad para almacenar la categoría

  listaNoticiasSport: any[] = [];
  listaNoticiasScience: any[] = [];
  listaNoticiasBusiness: any[] = [];
  listaNoticiasTech: any[] = [];
  listaNoticiasHealth: any[] = [];
  listaNoticiasEntertainment: any[] = [];

  @Input() listadoNoticiasSport: any;
  @Input() listadoNoticiasScience: any;
  @Input() listadoNoticiasBusiness: any;
  @Input() listadoNoticiasTech: any;
  @Input() listadoNoticiasHealth: any;
  @Input() listadoNoticiasEntertainment: any;

  constructor(private http: HttpClient) {}

  getNoticiasPorCategoria(categoria: string): Observable<any[]> {
    if (!this.newsCache.has(categoria) || !this.newsCache.get(categoria)?.observers.length) {
      const url = `https://newsapi.org/v2/top-headlines?language=en&category=${categoria}&apiKey=12c5c9726e834cbbbaf33d1e05ae1efc`;
      const cache = new ReplaySubject<any[]>(1);
      this.http.get<any>(url).subscribe((data: any) => {
        cache.next(data.articles || []); 
      });
      this.newsCache.set(categoria, cache);
    }
    return this.newsCache.get(categoria)?.asObservable() || new ReplaySubject<any[]>(1).asObservable();
  }

  setFiltradoGridSeccion(filtrado: string, categoria: string) {
    // Actualiza el valor del filtrado y la categoría en función de la selección del usuario
    this.filtradoGridSeccion = filtrado;
    this.categoria = categoria;
    // Luego, llamas a la función getNoticiasPorCategoria con los nuevos valores de filtrado y categoría.
    this.getNoticiasPorCategoria(categoria);
  }
}