import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-usuario-component',
  templateUrl: './usuario-component.component.html',
  styleUrls: ['./usuario-component.component.css']
})
export class UsuarioComponentComponent implements OnInit {

  user : User |null ;

  users: User[] = [];

  editingUser: User | null = null;

  editedField: string | null = null;

  showModal: boolean = false;

  selectedImageURL: string | null = null;

  editedUser: User | null = null;

  constructor(private userService: UserService){
    this.user = null;
  }
  ngOnInit(){
    this.userService.getLoggedInUser().subscribe((user) => {
      this.user = user
      this.users = this.users;
      this.editingUser = { ...user };
      this.editedUser = { ...user };
  })}
  
  deleteUser(userId: number) {
    this.userService.deleteUser(userId).subscribe(() => {
      // Actualizar la lista de usuarios después de la eliminación
      this.users = this.users.filter((user) => user.id !== userId);
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
  updateUser() {
    if (this.editingUser) {
      this.userService.updateUser(this.editingUser).subscribe(() => {
        this.user = this.editingUser;
      });
    }
  }
  updateField(field: string): void {
    if (this.editingUser) {
      this.userService.updateUser(this.editingUser).subscribe(() => {
        this.user = this.editingUser;
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
      this.editingUser.rolBio = newInfoBio;
    }
  }
  onPasswordChange(newPassword: string) {
    if (this.editingUser) {
      this.editingUser.password = newPassword;
    }
  }

  onImageChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const selectedImage = fileList[0];
      this.selectedImageURL = URL.createObjectURL(selectedImage);
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
        rolBio: this.editedUser.rolBio || '',
        savedNews: this.editedUser.savedNews || [],
        img: this.editedUser.img || ''
      };
    }
  }

}
