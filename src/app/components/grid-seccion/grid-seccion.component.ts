import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grid-seccion',
  templateUrl: './grid-seccion.component.html',
  styleUrls: ['./grid-seccion.component.css']
})
export class GridSeccionComponent {
  constructor(private router: Router){

  }

  navegateTo(route : string){
    this.router.navigate(['/', route])
  }
}
