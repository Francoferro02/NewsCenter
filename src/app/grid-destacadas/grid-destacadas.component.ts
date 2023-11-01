import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Comentario, Noticia } from '../models/noticia.model';




@Component({
  selector: 'app-grid-destacadas',
  templateUrl: './grid-destacadas.component.html',
  styleUrls: ['./grid-destacadas.component.css']
})

export class GridDestacadasComponent implements OnInit {
  @Input()listadoNoticiasDestacas:any;
  selectedNoticia: Noticia | null = null;
  currentUser: string | null = null;


  constructor(private router: Router){
    
  }
  ngOnInit(): void {
    
  }
  
  navegateTo(route : string){
    this.router.navigate(['/', route])
  }

  redirectTo(){
    this.listadoNoticiasDestacas.articles.url;
  }

  openPopup(noticia: Noticia) {
    this.selectedNoticia = noticia;
  }

  closePopup() {
    this.selectedNoticia = null;
  }

  agregarComentario(noticia: Noticia, textoComentario: string) {
    // Agregar lógica para agregar un comentario a la noticia
    const comentario: Comentario = {
      text: '',
      usuario: this.currentUser || '',
      editing: false
    };
    noticia.comentario.push(comentario);
  }

  editarComentario(noticia: Noticia, index: number, textoComentario: string) {
    // Agregar lógica para editar un comentario en la noticia
    noticia.comentario[index].text = textoComentario;
  }

  eliminarComentario(noticia: Noticia, index: number) {
    // Agregar lógica para eliminar un comentario en la noticia
    noticia.comentario.splice(index, 1);
  }
  guardarComentario(noticia: Noticia, index: number) {
    // Agregar lógica para guardar el comentario editado
    noticia.comentario[index].editing = false;
    // Aquí puedes realizar una llamada al servicio para actualizar el comentario en el servidor
  }
}

