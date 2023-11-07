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
  user : User |null  ;
  nextCommentId: number = 1;
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
    fetch('http://localhost:3000/contador')
      .then((response) => response.json())
      .then((contadorData) => {
        const contador = contadorData.valor; 
        
        const comentario: Comentario = {
          idComentario: contador,
          text: textoComentario,
          usuario: (this.user?.name as string) || 'anonymous',
          editing: false,
          urlNoticia: noticia.url,
        };
                contadorData.valor = contador + 1;
        fetch('http://localhost:3000/comentarios', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(comentario),
        })
        .then((response) => response.json())
        .then((data) => {
          console.log('Comentario guardado en el servidor JSON:', data);
          
          fetch('http://localhost:3000/contador', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(contadorData),
          });
        })
        .catch((error) => {
          console.error('Error al guardar el comentario en el servidor JSON:', error);
        });
      })
      .catch((error) => {
        console.error('Error al obtener el valor del contador desde el servidor JSON:', error);
      });
  
    this.cerrarFormularioComentario();
  }



guardarNoticiaEnPerfil() {
  console.log(this.user)
  if (this.user && this.selectedNoticia) {
    // Obtén el índice del usuario actual
    const userIndex = this.user.id - 1;

    // Agrega la URL de la noticia al arreglo savedNews del usuario
    this.user.savedNews.push(this.selectedNoticia.url);

    // Actualiza el usuario en el servidor JSON utilizando una solicitud PUT
    fetch(`http://localhost:3000/users/${userIndex}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.user),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Noticia guardada en el perfil del usuario', data);
      })
      .catch((error) => {
        console.error('Error al guardar la noticia en el servidor JSON:', error);
      });
  }
}

  editarComentario(comentario: Comentario) {
    this.comentarioEnEdicion = comentario;
  }

  guardarComentario(comentario: Comentario) {
    // Realizar una solicitud POST al servidor JSON para guardar el comentario
    
  }


  eliminarComentario(noticia: Noticia, index: number) {
    const comentario = noticia.comentario[index];
  
    if (!comentario) {
      console.error('El comentario no existe en la posición especificada.');
      return;
    }
  
    fetch(`http://localhost:3000/comentarios/${comentario.idComentario}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 204) {
          // Éxito: el comentario se eliminó correctamente.
          console.log('Comentario eliminado en el servidor JSON.');
          // Ahora, también deberías eliminar el comentario localmente de la noticia.
          noticia.comentario.splice(index, 1);
        } else {
          console.error('No se pudo eliminar el comentario en el servidor JSON.');
        }
      })
      .catch((error) => {
        console.error('Error al eliminar el comentario en el servidor JSON:', error);
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

