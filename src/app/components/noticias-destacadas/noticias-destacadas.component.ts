import { Component, OnInit } from '@angular/core';
import { LastNewsService } from 'src/app/components/Services/last-news.service';
import { Noticia } from 'src/app/models/noticia.model';

@Component({
  selector: 'app-noticias-destacadas',
  templateUrl: './noticias-destacadas.component.html',
  styleUrls: ['./noticias-destacadas.component.css']
})
export class NoticiasDestacadasComponent implements OnInit {
  listaNoticiasDestacas: Noticia[] = [];

  constructor(private serviceApi: LastNewsService) {}

  ngOnInit(): void {
    this.getNoticiasDestacadas();
  }

  getNoticiasDestacadas() {
    this.serviceApi.fetchAndDisplayPosts().subscribe(data => {
      console.log(data);
      this.listaNoticiasDestacas = data.articles.map((article: any) => {
        return {
          urlToImage: article.urlToImage,
          title: article.title,
          content: article.content,
          url: article.url,
          comentario: [],
          rating: 0,
          CantidadCalificaciones: 0,
        };
      });
    });
  }

 
}

