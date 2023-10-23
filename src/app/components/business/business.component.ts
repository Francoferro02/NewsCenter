import { Component, Input, OnInit } from '@angular/core';
import { componentApiService } from '../Services/componentApi.service';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit {
  titulo:string = 'BUSINESS'

  listaNoticiasBusiness: any[] = [];
  @Input()listadoNoticiasBusiness:any;

  constructor(private serviceApi: componentApiService){}

  ngOnInit(): void {
    this.serviceApi.getNoticiasPorCategoria(this.titulo.toLowerCase()).subscribe((data) => {
      console.log(data);
      this.listaNoticiasBusiness = data;
    });
  }

}
