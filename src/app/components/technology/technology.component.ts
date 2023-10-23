import { Component, Input, OnInit } from '@angular/core';
import { componentApiService } from '../Services/componentApi.service';

@Component({
  selector: 'app-technology',
  templateUrl: './technology.component.html',
  styleUrls: ['./technology.component.css']
})
export class TechnologyComponent implements OnInit {
  titulo:string = 'TECHNOLOGY'

  listaNoticiasTech: any[] = [];
  @Input()listadoNoticiasTech:any;

  constructor(private serviceApi: componentApiService){}

  ngOnInit(): void {
    this.serviceApi.getNoticiasPorCategoria('technology').subscribe((data) => {
      console.log(data);
      this.listaNoticiasTech = data;
    });
  }

  
}
