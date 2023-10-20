import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grid-destacadas',
  templateUrl: './grid-destacadas.component.html',
  styleUrls: ['./grid-destacadas.component.css']
})

export class GridDestacadasComponent {
  
  constructor(private router: Router){

  }

  navegateTo(route : string){
    this.router.navigate(['/', route])
  }
}
