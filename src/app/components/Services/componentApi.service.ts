import { HttpClient } from '@angular/common/http';
import { Injectable, Input, OnInit } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class componentApiService {
  
 constructor(private http:HttpClient){}

 private newsCache = new Map<string, ReplaySubject<any[]>>();
  
 listaNoticiasSport: any [] = [];
 listaNoticiasScience: any [] = [];
 listaNoticiasBusiness: any [] = [];
 listaNoticiasTech: any [] = [];
 listaNoticiasHealth: any [] = [];
 listaNoticiasEntertainment: any[] = [];


 @Input()listadoNoticiasSport:any;
 @Input()listadoNoticiasScience:any;
 @Input()listadoNoticiasBusiness:any;
 @Input()listadoNoticiasTech:any;
 @Input()listadoNoticiasHealth:any;
 @Input() listadoNoticiasEntertainment: any;




 getNoticiasPorCategoria(categoria: string): Observable<any[]> {
  if (!this.newsCache.has(categoria) || !this.newsCache.get(categoria)?.observers.length) {
    const url = `https://newsapi.org/v2/top-headlines?language=en&category=${categoria}&apiKey=385dd2c9c8254f5db32d6eedbad90e95`;
    const cache = new ReplaySubject<any[]>(1);
    this.http.get<any>(url).subscribe((data) => {
      cache.next(data.articles || []); // Utiliza 'data.articles' si está definido, de lo contrario, usa un arreglo vacío
    });
    this.newsCache.set(categoria, cache);
  }
  return this.newsCache.get(categoria)?.asObservable() || new ReplaySubject<any[]>(1).asObservable();
}

  filtradoArray(category: string) {
    if (category === "sports") {
      return this.listaNoticiasSport;
    } else if (category === "science") {
      return this.listaNoticiasScience;
    }else if (category === "business") {
      return this.listaNoticiasBusiness;
    }else if (category === "technology") {
      return this.listadoNoticiasTech;
    }else if (category === "health") {
      return this.listadoNoticiasHealth;
    }else if (category === "entertainment") {
      return this.listadoNoticiasHealth;
    } else {
      return [];
    }
  }

}