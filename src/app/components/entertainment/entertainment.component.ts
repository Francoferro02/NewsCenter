import { Component, Input, OnInit } from '@angular/core';
import { componentApiService } from '../Services/componentApi.service';

@Component({
  selector: 'app-entertainment',
  templateUrl: './entertainment.component.html',
  styleUrls: ['./entertainment.component.css']
})
export class EntertainmentComponent implements OnInit {
  titulo:string = 'ENTERTAINMENT'

  listaNoticiasEntertainment: any[] = [];
  @Input()listadoNoticiasEntertainment:any;

  constructor(private serviceApi: componentApiService){}

  ngOnInit(): void {
    this.serviceApi.getNoticiasPorCategoria(this.titulo.toLowerCase()).subscribe((data) => {
      console.log(data);
      this.listaNoticiasEntertainment = data;
    });
  }

}
