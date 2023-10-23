import { Component, Input } from '@angular/core';
import { componentApiService } from 'src/app/components/Services/componentApi.service';

@Component({
  selector: 'app-science',
  templateUrl: './science.component.html',
  styleUrls: ['./science.component.css']
})
export class ScienceComponent {

  listaNoticiasScience: any [] = this.serviceApi.listaNoticiasScience;
  @Input()listadoNoticiasSport:any;
  @Input()listadoNoticiasScience:any;
  titulo:string = 'SCIENCE'

  constructor(private serviceApi: componentApiService){}

  ngOnInit(): void {
    this.serviceApi.getNoticiasPorCategoria(this.titulo.toLowerCase());

  }

}
