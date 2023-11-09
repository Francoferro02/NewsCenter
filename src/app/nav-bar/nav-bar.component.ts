import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../components/Services/user.service';
import {User} from 'src/app/models/user.model'
import { Noticia } from '../models/noticia.model';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent  implements OnInit{
  @Input() showPopup: boolean = false;
  @Input() showPopup1: boolean = false
  @Input() loggedIn : boolean = false;
  @Output() closePopupEvent = new EventEmitter<void>();
  

  user : User |null ;

  @Input() noticias: Noticia[] = []; 
  @Output() searchResultSelected = new EventEmitter<Noticia>(); 

  searchTerm: string = ''; 
  searchResults: Noticia[] = []; 

  constructor(private userService: UserService) {
    this.user = null;
  }

  ngOnInit() {
    this.userService.getLoggedInUser().subscribe((user) => {
      this.user = user
      this.updateLoggedInValue(!!user);
       // Update the value of loggedIn
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

  search() {
    this.searchResults = this.noticias.filter(noticia =>
      noticia.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  selectResult(result: Noticia) {
    this.searchResultSelected.emit(result);
    this.searchTerm = ''; // Limpia el campo de búsqueda
    this.searchResults = []; // Limpia los resultados
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

  logout() {
    this.userService.logoutUser();
  }

  updateLoggedInValue(loggedIn: boolean) {
    this.loggedIn = loggedIn;
    console.log(this.loggedIn);
  }
}