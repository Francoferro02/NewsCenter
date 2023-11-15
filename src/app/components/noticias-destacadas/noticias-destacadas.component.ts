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
  

  constructor() {}

  ngOnInit() {

  }

}

