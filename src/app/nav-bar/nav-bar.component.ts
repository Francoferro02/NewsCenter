import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../components/Services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent  implements OnInit{
  @Input() showPopup: boolean = false;
  @Input() showPopup1: boolean = false;
  @Output() closePopupEvent = new EventEmitter<void>();
  loggedIn: boolean = false;
  constructor(private userService: UserService) {}
  ngOnInit() {
    this.userService.getLoggedInUser().subscribe((user) => {
      this.loggedIn = !!user;
    });
  }
  detectarEnter(){
    document.addEventListener("DOMContentLoaded", () => {
      const searchInput = document.getElementById("search-input") as HTMLInputElement;
    
      // Detecta el evento "keyup" en el campo de búsqueda
      searchInput.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
          // Agregar logica para buscar cuando tenga el llamado a API
          const searchTerm = searchInput.value;
          // Agregar el "Quisiste decir?"
          console.log("Búsqueda realizada: " + searchTerm);
        }
      });
    });
  }


  openLoginPopup() {
    this.showPopup1 = true;
  }

  openRegisterPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }

  closePopup1() {
    this.showPopup1 = false;
  }

  login(email: string, password: string) {
    const success = this.userService.loginUser(email, password);
    if (success) {
      this.showPopup = false;
    }
  }

  logout() {
    this.userService.logoutUser();
  }
}