import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from '../Services/user.service';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { UserStateService } from '../Services/user-state.service';
import { take } from 'rxjs';
import { Noticia } from 'src/app/models/noticia.model';
import { AuthGuard } from 'src/app/auth.guard';
import { AuthServiceService } from '../Services/auth-service.service';

@Component({
  selector: 'app-usuario-component',
  templateUrl: './usuario-component.component.html',
  styleUrls: ['./usuario-component.component.css']
})
export class UsuarioComponentComponent implements OnInit {

  user: User | null;

  users: User[] = [];

  editingUser: User | null = null;

  editedField: string | null = null;

  showModal: boolean = false;

  selectedImageURL: string | null = null;

  editedUser: User | null = null;

  savedNews: Noticia[] = [];

  popupTimer: any;

  constructor(private userService: UserService,
    private changeDetectorRef: ChangeDetectorRef,
    private userStateService: UserStateService,
    private router: Router,
    private authService : AuthServiceService,
    private authGuard : AuthGuard) {
    this.user = null;
  }
  ngOnInit() {

   
    this.userService.getLoggedInUser().subscribe((user) => {
      
      this.user = user;
      this.editingUser = { ...user };
      this.savedNews = user.savedNews || [];
      this.selectedImageURL = user.img;
      console.log(user.savedNews);
      if (this.selectedImageURL) {
        const imgElement = document.getElementById('imagenUsuario'); 
        if (imgElement) {
          imgElement.setAttribute('src', this.selectedImageURL);
        }
      } else {
        console.log('no hay imagen de perfil');
      }
    });

    

    this.userStateService.users$.subscribe((users) => {
      this.users = users.filter(u => u.id !== this.user?.id); // Filtra el usuario actual
    });

    

  }
  borrarNoticia(news: Noticia) {
    if (this.authService.isUsuarioAutenticado()) {
      if (this.user && news) {
        const userId = this.user.id;
  
        // Llama al servicio para borrar la noticia del servidor
        this.userService.deleteNewsFromUser(userId, news.title).subscribe(() => {
          const index = this.savedNews.findIndex(n => n.title === news.title);
          if (index !== -1) {
            // Elimina el elemento del array por índice
            this.savedNews.splice(index, 1);
          }
        }, error => {
          console.error('Error al borrar la noticia del servidor:', error);
        });
      }
    } else {
      this.authGuard.canActivate();
    }
  }
  
  
  
  
  deleteUser(userId: number) {
    this.userService.deleteUser(userId).subscribe(() => {
      // Actualizar la lista de usuarios después de la eliminación
      this.userStateService.users$.subscribe((users) => {
        this.users = users.filter(u => u.id !== this.user?.id); // Filtra el usuario actual
      });
    });
  }


  editUser(user: User) {
    this.editingUser = { ...user }; // Clonar el usuario para la edición
  }

  isEditing(field: string): boolean {
    return this.editedField === field;
  }

  startEditing(field: string): void {
    this.editedField = field;
  }

  async updateUser() {
    if (this.editingUser) {
      try {
        // Realizar la actualización del usuario en el servidor
        await this.userService.updateUser(this.editingUser);

        // Actualizar el usuario localmente
        this.user = { ...this.editingUser };

        // Actualizar la imagen
        if (this.selectedImageURL) {
          this.user.img = this.selectedImageURL;
        }

        // ... (resto del código)
      } catch (error) {
        console.error("Error al actualizar el usuario: " + error);
      }
    }
  }
  updateField(field: string): void {
    if (this.editingUser) {
      this.userService.updateUser(this.editingUser).subscribe(updatedUser => {
        // Actualizar el usuario localmente
        this.user = { ...updatedUser };

        // Actualizar el usuario en userStateService
    
        this.userStateService.users$.pipe(take(1)).subscribe(users => {
          const updatedUsers = users.map(user => user.id === this.user?.id ? this.user! : user);
          this.userStateService.setUsers(updatedUsers);
        });
      });
    }

    if (this.editedUser) {
      this.user = { ...this.editedUser };
      if (field === 'image' && this.selectedImageURL) {
        this.user.img = this.selectedImageURL;
      }
    }

    this.editedField = null;
  }



  onNameChange(newName: string) {
    if (this.editingUser) {
      this.editingUser.name = newName;
    }
  }
  onSurnameChange(newSurname: string) {
    if (this.editingUser) {
      this.editingUser.surname = newSurname;
    }
  }
  onEmailChange(newEmail: string) {
    if (this.editingUser) {
      this.editingUser.email = newEmail;
    }
  }
  onLocationChange(newLocation: string) {
    if (this.editingUser) {
      this.editingUser.location = newLocation;

    }
  }
  onInfoBioChange(newInfoBio: string) {
    if (this.editingUser) {
      this.editingUser.rolbio = newInfoBio;
    }
  }
  onPasswordChange(newPassword: string) {
    if (this.editingUser) {
      this.editingUser.password = newPassword;
    }
  }



  async onImageChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const selectedImage = fileList[0];

      
      const formData = new FormData();
      formData.append("image", selectedImage);

      try {
       
        const response = await fetch("https://api.imgbb.com/1/upload?key=c3224f0dab590826bdda5e40ba14114c", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          if (data && data.data && data.data.url) {
            // Obtén la URL de la imagen subida
            
            const selectedImageURL = data.data.url;

            console.log("imagen link: " + selectedImageURL);

            // Update the user object with the selectedImageURL
            const userId = this.editingUser?.id; // Change this to the appropriate user ID
            const userToUpdate = await fetch(`http://localhost:3000/users/${userId}`);
            const userData = await userToUpdate.json();
            userData.img = selectedImageURL;

            // Update the user data on the JSON Server
            await fetch(`http://localhost:3000/users/${userId}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(userData),
            });

            console.log("User data updated with image URL.");

            this.selectedImageURL = selectedImageURL;
            console.log("a", this.selectedImageURL);
            // Forzar la actualización de la vista
            this.changeDetectorRef.detectChanges();
          }
        } else {
          console.error("Error al cargar la imagen en ImgBB.");
        }
      } catch (error) {
        console.error("Error al cargar la imagen: " + error);
      }
      
    }
    
  }


  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    if (this.editedUser) {
      this.user = {
        id: this.editedUser.id || 0,
        name: this.editedUser.name || '',
        surname: this.editedUser.surname || '',
        email: this.editedUser.email || '',
        password: this.editedUser.password || '',
        location: this.editedUser.location || '',
        join: this.editedUser.join || new Date(),
        rolbio: this.editedUser.rolbio || '',
        savedNews: this.editedUser.savedNews || [],
        img: this.editedUser.img || ''
      };
    }
  }
  showPopup(event: MouseEvent, newsUrl: string) {
    event.preventDefault();
    const newsPopup = document.getElementById('newsPopup');
    const newsFrame = document.getElementById('newsFrame');

    if (newsPopup) {
      // Comprobar si newsPopup no es nulo antes de acceder a su propiedad style
      if (newsFrame) {
        // Cargar el contenido de la noticia en el iframe
        newsFrame.setAttribute('src', newsUrl);
      }

      // Mostrar el popup
      newsPopup.style.display = 'block';
    }
  }

  startPopupTimer(newsUrl: string) {
    this.popupTimer = setTimeout(() => {
      const newsPopup = document.getElementById('newsPopup');
      const newsFrame = document.getElementById('newsFrame');

      if (newsPopup && newsFrame) {
        // Cargar el contenido de la noticia en el iframe
        newsFrame.setAttribute('src', newsUrl);

        // Mostrar el popup
        newsPopup.style.display = 'block';
      }
    }, 4000);
  }

  clearPopupTimer() {
    clearTimeout(this.popupTimer);
  }

  closePopup() {
    const newsPopup = document.getElementById('newsPopup');

    if (newsPopup) {
      // Ocultar el popup
      newsPopup.style.display = 'none';
    }
  }

  deleteNews(news: Noticia){
    if (this.authService.isUsuarioAutenticado()) {
      if (this.user && news) {
        const userId = this.user.id;
        const newsId = news.title; 
        console.log(newsId);
        
        this.userService.deleteNewsFromUser(userId, newsId).subscribe(() => {
          
          this.savedNews = this.savedNews.filter(n => n.title !== news.title);
       
          this.changeDetectorRef.detectChanges();
        });
      }
    } else {
      this.authGuard.canActivate();
    }
  }
}
