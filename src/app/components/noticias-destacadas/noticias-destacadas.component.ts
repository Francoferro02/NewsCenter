import { Component, Input, OnInit } from '@angular/core';
import { LastNewsService } from 'src/app/components/Services/last-news.service';

@Component({
  selector: 'app-noticias-destacadas',
  templateUrl: './noticias-destacadas.component.html',
  styleUrls: ['./noticias-destacadas.component.css']
})
export class NoticiasDestacadasComponent implements OnInit{
  listaNoticiasDestacas: any [] = [];

  constructor(private serviceApi: LastNewsService){
   
  }

  ngOnInit(): void {
    this.getNoticiasDestacadas();
  }

  getNoticiasDestacadas(){
    this.serviceApi.fetchAndDisplayPosts().subscribe(data =>{
    console.log(data);
    this.listaNoticiasDestacas = data.articles;
    })
  }
  
}
