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
  comentando: boolean = false;
  nuevoComentario: string = '';
  comentarioEnEdicion: Comentario | null = null;  

  constructor(private router: Router){
    
  }
  ngOnInit(): void {
    
  }
  
  navegateTo(route : string){
    this.router.navigate(['/', route])
  }

  redirectTo() {
    if (this.selectedNoticia) {
      window.open(this.selectedNoticia.url, "_blank");
    }
  }

  openPopup(noticia: Noticia) {
    this.selectedNoticia = noticia;
  }

  closePopup() {
    this.selectedNoticia = null;
  }

  agregarComentario(noticia: Noticia, textoComentario: string) {
    const comentario: Comentario = {
      text: textoComentario,
      usuario: this.currentUser || '',
      editing: false
    };
    noticia.comentario.push(comentario);
    this.cerrarFormularioComentario(); 
  }

  editarComentario(comentario: Comentario) {
    this.comentarioEnEdicion = comentario;
  }

  guardarComentario(comentario: Comentario) {
    this.comentarioEnEdicion = null;
    // Puedes realizar una llamada al servicio para actualizar el comentario en el servidor si es necesario.
  }
  eliminarComentario(noticia: Noticia, index: number) {
    noticia.comentario.splice(index, 1);
  }
  mostrarFormularioComentario() {
    this.comentando = true;
  }

  cerrarFormularioComentario() {
    this.comentando = false;
    this.nuevoComentario = '';
  }

  toggleComentarioForm() {
    this.comentando = !this.comentando;
    if (this.comentando) {
      this.nuevoComentario = '';
    }
  }

  compartirEnTwitter(url: string) {
    window.open(`https://twitter.com/share?url=${encodeURIComponent(url)}`, '_blank');
  }
  
  compartirEnFacebook(url: string) {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  }
  
  compartirEnWhatsApp(url: string) {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`, '_blank');
  }

  
  
}

