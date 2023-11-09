  import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { clippingParents } from '@popperjs/core';
import { Comentario, Noticia } from '../models/noticia.model';
import {User} from 'src/app/models/user.model'
import { UserService } from '../components/Services/user.service';
import { HttpClient } from '@angular/common/http';
import { CommentsService } from '../components/Services/comments.service';



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
  rated2: boolean = false;
  nuevoComentario: string = '';
  comentarioEnEdicion: Comentario | null = null;  
  user : User |null  ;
  nextCommentId: number = 1;
  comments: Noticia[] = [];
  savedSuccessfully: boolean = false;
  alreadySaved: boolean = false;
 

  constructor(private router: Router, private userService: UserService, private http: HttpClient,private commentService: CommentsService){
    this.user = null;
    this.commentService.getComments().subscribe((comments) => {
        
    });
  }

 
  ngOnInit() {
    this.userService.getLoggedInUser().subscribe((user) => {
      this.user = user
      
       // Update the value of loggedIn
  })
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
      
      // Realiza una solicitud GET al servidor JSON para obtener todos los comentarios de la noticia por su URL
      this.http.get<Comentario[]>(`http://localhost:3000/comentarios?urlNoticia=${encodeURIComponent(noticia.url)}`).subscribe((comentarios) => {
        // Almacena los comentarios en la propiedad comentario de la noticia seleccionada
        this.selectedNoticia = noticia;
        this.selectedNoticia.comentario = comentarios;
    
        // Realiza una solicitud GET al servidor JSON para obtener la información de la noticia en la pestaña "news"
        this.http.get<any[]>(`http://localhost:3000/news?urlNoticia=${encodeURIComponent(noticia.url)}`).subscribe((news) => {
          // Verifica si la noticia y la respuesta del servidor no son nulas
          if (this.selectedNoticia && news && news.length > 0) {
            // Si se encontró información de la noticia, actualiza la calificación en la noticia seleccionada
            this.selectedNoticia.rating = news[0].rating;
          } else {
            // Si no se encontró información, establece la calificación en 0
            if (this.selectedNoticia) {
              this.selectedNoticia.rating = 0;
            }
          }
        });
      });
    }


  closePopup() {
    this.rated = false;
    this.rated2 = false;
    this.selectedNoticia = null;
  }

  agregarComentario(noticia: Noticia, textoComentario: string) {
    const comentario: Comentario = {
      text: textoComentario,
      usuario: (this.user?.name as string) || 'anonymous',
      editing: false,
      urlNoticia: noticia.url,
      id: this.generateUniqueCommentId()
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

 generateUniqueCommentId() {
  return Date.now().toString();
}

guardarNoticiaEnPerfil() {
  if (this.user && this.selectedNoticia) {
    const newsUrl = this.selectedNoticia.url;

    if (!this.user.savedNews.includes(newsUrl)) {
      this.user.savedNews.push(newsUrl);

      this.userService.updateUser(this.user).subscribe((response: any) => {
        this.savedSuccessfully = true;
        this.alreadySaved = false;
        console.log('Noticia guardada en el perfil del usuario', response);

        setTimeout(() => {
          this.savedSuccessfully = false;
        }, 3000);
      });
    } else {
      this.alreadySaved = true;
      this.savedSuccessfully = false;
      console.log('La noticia ya está en la lista de noticias guardadas');
      
      setTimeout(() => {
        this.alreadySaved = false;
      }, 3000);
    }
  }
}


editAndSaveComentario(comentario: Comentario) {
  
  console.log("ajajaj")
  if (!comentario.editing) {
    // Si el comentario no está en modo edición, lo activamos para la edición.
    comentario.editing = true;
  } else {
    comentario.editing = false;
    // Si el comentario está en modo edición, lo guardamos en el servidor y deshabilitamos la edición.
    fetch(`http://localhost:3000/comentarios/${comentario.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(comentario)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Comentario actualizado en el servidor JSON:', data);
      })
      .catch((error) => {
        console.error('Error al actualizar el comentario en el servidor JSON:', error);
      });
      
      console.log("mm");
   // Deshabilita la edición
  }

}
eliminarComentario(commentId: string): void {
  this.commentService.deleteComment(commentId).subscribe(() => {
    // Verifica si selectedNoticia no es nulo
    if (this.selectedNoticia) {
      const comentarioIndex = this.selectedNoticia.comentario.findIndex((comentario) => comentario.id === commentId);
      if (comentarioIndex !== -1) {
        this.selectedNoticia.comentario.splice(comentarioIndex, 1);
        console.log('Comentario eliminado en el servidor JSON y localmente.');
      } else {
        console.error('No se encontró el comentario localmente.');
      }
    } else {
      console.error('selectedNoticia es nulo.');
    }
  });
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
      // Realiza una solicitud GET al servidor JSON para obtener la lista de noticias
      this.http.get<any[]>('http://localhost:3000/news').subscribe((newsList) => {
        let newsToUpdate = newsList.find((news) => news.urlNoticia === this.selectedNoticia?.url);
  
        if (newsToUpdate) {
          // La noticia existe, actualiza su rating
          newsToUpdate.CantidadCalificaciones += 1;
          const newRating = (newsToUpdate.rating * (newsToUpdate.CantidadCalificaciones - 1) + ratingStar) / newsToUpdate.CantidadCalificaciones;
          newsToUpdate.rating = Number(newRating.toFixed(1));
          this.rated2 =true
  
          // Realiza una solicitud PUT al servidor JSON para actualizar la noticia
          this.http.put(`http://localhost:3000/news/${newsToUpdate.id}`, newsToUpdate).subscribe((response) => {
            console.log('Calificación actualizada en el servidor', response);
          });
        } else {
          // La noticia no existe, agrégala al array news
          newsToUpdate = {
            urlNoticia: this.selectedNoticia?.url,
            rating: ratingStar,
            CantidadCalificaciones: 1,
           
          };
  
          // Realiza una solicitud POST para agregar la nueva noticia
          this.http.post('http://localhost:3000/news', newsToUpdate).subscribe((response) => {
            console.log('Nueva noticia agregada al servidor', response);
            this.rated2 =true
          });
        }
      });
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

