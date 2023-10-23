import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {
  @Input()listaNoticiasSport:any;

  @Input() collapsed = false;
  @Input() screenWidth = 0;
  

  getBodyClass(): string{
    let styleClass = '';
    if (this.collapsed && this.screenWidth > 768) {
    styleClass = 'body-trimmed'
    }else if(this.collapsed && this.screenWidth <= 768){
    styleClass = 'body-md-screen'
    }
  return styleClass;
  }

  
}
