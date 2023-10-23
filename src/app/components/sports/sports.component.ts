import { Component, Input, OnInit } from '@angular/core';
import { componentApiService } from 'src/app/components/Services/componentApi.service';

@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.css']
})
export class SportsComponent implements OnInit {

  titulo:string = 'SPORTS'
  listaNoticiasSport: any[] = [];
  @Input()listadoNoticiasSport:any;

  constructor(private serviceApi: componentApiService){}

  ngOnInit(): void {
    this.serviceApi.getNoticiasPorCategoria(this.titulo.toLowerCase()).subscribe((data) => {
      console.log(data);
      this.listaNoticiasSport = data;
    });
  }

}
