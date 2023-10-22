import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LastNewsService {
  
 constructor(private http:HttpClient){}


  fetchAndDisplayPosts(): Observable<any> {
    const url = `https://newsapi.org/v2/top-headlines?category=general&apiKey=385dd2c9c8254f5db32d6eedbad90e95`
    return this.http.get(url);
  }
}


