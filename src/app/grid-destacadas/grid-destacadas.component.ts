import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-grid-destacadas',
  templateUrl: './grid-destacadas.component.html',
  styleUrls: ['./grid-destacadas.component.css']
})

export class GridDestacadasComponent implements OnInit {
  @Input()listadoNoticiasDestacas:any;
  constructor(private router: Router){
    
  }
  ngOnInit(): void {
    
  }
  
  navegateTo(route : string){
    this.router.navigate(['/', route])
  }
}
