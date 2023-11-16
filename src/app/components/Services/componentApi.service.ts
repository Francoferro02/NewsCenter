import { HttpClient } from '@angular/common/http';
import { Injectable, Input, OnInit } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class componentApiService {
  private newsCache = new Map<string, ReplaySubject<any[]>>();
  private categoria: string = ''; // Propiedad para almacenar la categoría
  private paisGridSeccion: string = 'us'; // Nuevo
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
      const url = `https://newsapi.org/v2/top-headlines?country=${this.paisGridSeccion}&category=${categoria}&apiKey=12c5c9726e834cbbbaf33d1e05ae1efc`;
      const cache = new ReplaySubject<any[]>(1);
      this.http.get<any>(url).subscribe((data: any) => {
        cache.next(data.articles || []); 
      });
      this.newsCache.set(categoria, cache);
    }
    return this.newsCache.get(categoria)?.asObservable() || new ReplaySubject<any[]>(1).asObservable();
  }

  setFiltradoGridSeccion( pais: string, categoria: string) {
    
    this.paisGridSeccion = pais;
    this.getNoticiasPorCategoria(categoria);
  }
}