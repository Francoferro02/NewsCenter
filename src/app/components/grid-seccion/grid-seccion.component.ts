import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { componentApiService } from '../Services/componentApi.service';

@Component({
  selector: 'app-grid-seccion',
  templateUrl: './grid-seccion.component.html',
  styleUrls: ['./grid-seccion.component.css'],
})
export class GridSeccionComponent implements OnInit {
  @Input() titulo: string = '';
  @Input() listadoNoticiasSport: any;
  @Input() listadoNoticiasScience: any;
  @Input() listadoNoticiasHealth: any;
  @Input() listadoNoticiasTech: any;
  @Input() listadoNoticiasBusiness: any;
  @Input() listadoNoticiasEntertainment: any;

  nombreArray: any[] = [];
  constructor(
    private router: Router,
    private componenteApi: componentApiService
  ) {}
  ngOnInit(): void {
    this.componenteApi
      .getNoticiasPorCategoria(this.titulo.toLowerCase())
      .subscribe((data) => {
        this.nombreArray = data;
      });
  }

  navegateTo(route: string) {
    this.router.navigate(['/', route]);
  }
}
