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

  constructor(private userService: UserService){
    this.user = null;
  }
  ngOnInit(){
    this.userService.getLoggedInUser().subscribe((user) => {
      this.user = user
      this.users = this.users;
      this.editingUser = { ...user };
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
        this.editedField = null;
      });
    }
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
  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

}
