import { Component, Input } from '@angular/core';
import { componentApiService } from '../Services/componentApi.service';

@Component({
  selector: 'app-health',
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.css']
})
export class HealthComponent {
  titulo:string = 'HEALTH'
  listaNoticiasHealth: any[] = [];
  @Input()listadoNoticiasHealth:any;

  constructor(private serviceApi: componentApiService){}

  ngOnInit(): void {
    this.serviceApi.getNoticiasPorCategoria(this.titulo.toLowerCase()).subscribe((data) => {
      console.log(data);
      this.listaNoticiasHealth = data;
    });
  }

  
}
