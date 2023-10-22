import { Component, Input } from '@angular/core';
import { LastNewsService } from 'src/app/Services/last-news.service';

@Component({
  selector: 'app-noticias-destacadas',
  templateUrl: './noticias-destacadas.component.html',
  styleUrls: ['./noticias-destacadas.component.css']
})
export class NoticiasDestacadasComponent {
  listaNoticiasDestacas: any [] = [];

  constructor(private serviceApi: LastNewsService){
   
  }

  getNoticiasDestacadas(){
    this.serviceApi.fetchAndDisplayPosts().subscribe(data =>{
    console.log(data);
    this.listaNoticiasDestacas = data.articles;
    })
  }
}
