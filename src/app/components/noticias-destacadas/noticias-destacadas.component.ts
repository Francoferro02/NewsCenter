import { Component, OnInit } from '@angular/core';
import { of, switchMap } from 'rxjs';
import { LastNewsService } from 'src/app/components/Services/last-news.service';
import { Noticia } from 'src/app/models/noticia.model';

@Component({
  selector: 'app-noticias-destacadas',
  templateUrl: './noticias-destacadas.component.html',
  styleUrls: ['./noticias-destacadas.component.css']
})
export class NoticiasDestacadasComponent implements OnInit {
  listaNoticiasDestacas: Noticia[] = [];
  selectedNoticia: Noticia | undefined;
  showNewsDetail: boolean | undefined;
  

  constructor(private serviceApi: LastNewsService) {}

  ngOnInit() {
    this.serviceApi.getListadoNoticiasDestacasObservable().subscribe(
      (noticias: Noticia[]) => {
        this.listaNoticiasDestacas = noticias;
      },
      error => {
        console.error('Error al obtener noticias:', error);
      }
    );
  }
/*
  getNoticiasDestacadas() {
    this.serviceApi.fetchAndDisplayPosts().subscribe((noticias: Noticia[]) => {
      console.log(noticias);
      this.listaNoticiasDestacas = noticias.articles.map((article: any) => {
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
*/
}

