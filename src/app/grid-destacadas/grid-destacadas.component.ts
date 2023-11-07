import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { clippingParents } from '@popperjs/core';
import { Comentario, Noticia } from '../models/noticia.model';
import {User} from 'src/app/models/user.model'
import { UserService } from '../components/Services/user.service';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-grid-destacadas',
  templateUrl: './grid-destacadas.component.html',
  styleUrls: ['./grid-destacadas.component.css']
})

export class GridDestacadasComponent implements OnInit {
  @Input()listadoNoticiasDestacas:any;
  selectedNoticia: Noticia | null = null;
  comentando: boolean = false;
  rated: boolean = false;
  nuevoComentario: string = '';
  comentarioEnEdicion: Comentario | null = null;  
  user : User |null ;

  constructor(private router: Router, private userService: UserService, private http: HttpClient){
    this.user = null;
  }

 
  ngOnInit() {
    this.userService.getLoggedInUser().subscribe((user) => {
      this.user = user
      
       // Update the value of loggedIn
    });
  }
  
  navegateTo(route : string){
    this.router.navigate(['/', route])
  }

  redirectTo() {
    if (this.selectedNoticia) {
      window.open(this.selectedNoticia.url, "_blank");
    }
  }

   /*  openPopup(noticia: Noticia) {
      this.selectedNoticia = noticia;
    } */

    openPopup(noticia: Noticia) {
      // Realiza una solicitud GET al servidor JSON para obtener todos los comentarios de la noticia por su URL
      this.http.get<Comentario[]>(`http://localhost:3000/comentarios?urlNoticia=${encodeURIComponent(noticia.url)}`).subscribe((comentarios) => {
        this.selectedNoticia = noticia;
        this.selectedNoticia.comentario = comentarios;
      });
    }

  closePopup() {
    this.selectedNoticia = null;
  }

  agregarComentario(noticia: Noticia, textoComentario: string) {
    const comentario: Comentario = {
      text: textoComentario,
      usuario: (this.user?.name as string) || 'anonymous',
      editing: false,
      urlNoticia: noticia.url
    };

    noticia.comentario.push(comentario);
    
    fetch('http://localhost:3000/comentarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(comentario)
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Comentario guardado en el servidor JSON:', data);
    })
    .catch((error) => {
      console.error('Error al guardar el comentario en el servidor JSON:', error);
    });


    this.cerrarFormularioComentario();
}

  editarComentario(comentario: Comentario) {
    this.comentarioEnEdicion = comentario;
  }

  guardarComentario(comentario: Comentario) {
    // Realizar una solicitud POST al servidor JSON para guardar el comentario
    
  }


  eliminarComentario(noticia: Noticia, index: number) {
    noticia.comentario.splice(index, 1);
  }

  mostrarFormularioComentario() {
    this.toggleComentarioForm()
   
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


  ratingByStars(){
    this.rated = !this.rated;
  }
  rate(ratingStar: number) {
    if (this.selectedNoticia) {
      console.log(this.selectedNoticia.rating)
      this.selectedNoticia.CantidadCalificaciones += 1;
      this.selectedNoticia.rating = (this.selectedNoticia.rating * (this.selectedNoticia.CantidadCalificaciones - 1) + ratingStar) / this.selectedNoticia.CantidadCalificaciones;
    }
    console.log(this.selectedNoticia?.rating);
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

