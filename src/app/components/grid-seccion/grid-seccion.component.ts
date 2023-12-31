import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { componentApiService } from '../Services/componentApi.service';
import { Comentario, Noticia } from 'src/app/models/noticia.model';
import { User } from 'src/app/models/user.model'
import { UserService } from '../Services/user.service';
import { HttpClient } from '@angular/common/http';
import { CommentsService } from '../Services/comments.service';
import { LastNewsService } from '../Services/last-news.service';
import { SharedPopupService } from '../Services/sharedPopup';
import { AuthGuard } from 'src/app/auth.guard';
import { AuthServiceService } from '../Services/auth-service.service';

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

  selectedNoticia: Noticia | null = null;
  comentando: boolean = false;
  rated: boolean = false;
  rated2: boolean = false;
  nuevoComentario: string = '';
  comentarioEnEdicion: Comentario | null = null;
  user: User | null;
  nextCommentId: number = 1;
  comments: Noticia[] = [];
  savedSuccessfully: boolean = false;
  alreadySaved: boolean = false;
  nombreArray: any[] = [];
  categoria: string;
  selectedCountry: string = 'us'; 
  constructor(
    private router: Router,
    private componenteApi: componentApiService,
    private userService: UserService,
    private http: HttpClient,
    private commentService: CommentsService,
    private sharedPopupService: SharedPopupService,
    private authService: AuthServiceService,
    private authGuard: AuthGuard
  ) {
    this.user = null;
    this.categoria = 'general'
    this.commentService.getComments().subscribe((comments) => {
    });
  }
  ngOnInit(): void {
    this.componenteApi
      .getNoticiasPorCategoria(this.titulo.toLowerCase())
      .subscribe((data) => {
        this.nombreArray = data;
      });
    this.userService.getLoggedInUser().subscribe((user) => {
      this.user = user

      
    })

    this.sharedPopupService.selectedNoticia$.subscribe((noticia) => {
      if (noticia && this.sharedPopupService.getBusquedaDesdeNavBar()) { // Verificar la bandera
        this.openPopup(noticia);
      }
    });
  }
  ngOnDestroy() {
    this.sharedPopupService.closePopup();
  }

  navegateTo(route: string) {
    this.router.navigate(['/', route]);
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
    this.sharedPopupService.closePopup()
  }

  agregarComentario(noticia: Noticia, textoComentario: string) {
    if (this.authService.isUsuarioAutenticado()) {
      
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
    } else {
      
      this.authGuard.canActivate();
    }
    
    
  }

  generateUniqueCommentId() {
    return Date.now().toString();
  }

  guardarNoticiaEnPerfil() {
    if (this.authService.isUsuarioAutenticado()) {  
      if (this.user && this.selectedNoticia) {
        const newsUrl = this.selectedNoticia.url; // Obtén la URL de la noticia
  
        // Verifica si la noticia ya existe en la lista de noticias guardadas
        const alreadySaved = this.user.savedNews.some(noticia => noticia.url === newsUrl);
  
        if (!alreadySaved) {
          // La noticia no está en la lista, así que agrégala
          this.user.savedNews.push(this.selectedNoticia);
  
          this.userService.updateUser(this.user).subscribe((response: any) => {
            this.savedSuccessfully = true;
            this.alreadySaved = false;
            console.log('Noticia guardada en el perfil del usuario', response);
  
            setTimeout(() => {
              this.savedSuccessfully = false;
            }, 3000);
          });
        } else {
          // La noticia ya está en la lista de noticias guardadas
          this.alreadySaved = true;
          this.savedSuccessfully = false;
          console.log('La noticia ya está en la lista de noticias guardadas');
  
          setTimeout(() => {
            this.alreadySaved = false;
          }, 3000);
        }
      }
    } else {
      this.authGuard.canActivate();
    }
  }


  editAndSaveComentario(comentario: Comentario) {
    if (!comentario.editing) {
      // Si el comentario no está en modo edición, lo activamos para la edición.
      comentario.editing = true;
    } else {
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
      comentario.editing = false; // Deshabilita la edición
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
    if (this.authService.isUsuarioAutenticado()) {
      // Lógica para el evento de clic cuando el usuario está autenticado
      this.toggleComentarioForm()
    
    } else {
      // Abre el modal de inicio de sesión si el usuario no está autenticado
      this.authGuard.canActivate();
    }
    
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


  ratingByStars() {
    if (this.authService.isUsuarioAutenticado()) {
      // Lógica para el evento de clic cuando el usuario está autenticado
      this.rated = !this.rated;
      console.log('ooo');
    } else {
      // Abre el modal de inicio de sesión si el usuario no está autenticado
      this.authGuard.canActivate();
    }
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
          this.rated2 = true

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
            this.rated2 = true
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

  cambiarFiltradoComponent(event: Event) {
    this.componenteApi.setFiltradoGridSeccion(this.selectedCountry,this.categoria);
}




}


