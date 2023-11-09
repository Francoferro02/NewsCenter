import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../components/Services/user.service';
import { User } from 'src/app/models/user.model'
import { Noticia } from '../models/noticia.model';
import { LastNewsService } from '../components/Services/last-news.service';
import { SharedPopupService } from '../components/Services/sharedPopup';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  @Input() showPopup: boolean = false;
  @Input() showPopup1: boolean = false
  @Input() loggedIn: boolean = false;
  @Output() closePopupEvent = new EventEmitter<void>();
  busquedaDesdeNavBar: boolean = false;


  user: User | null;

  @Input() noticias: Noticia[] = [];
  @Output() searchResultSelected = new EventEmitter<Noticia>();

  searchTerm: string = '';
  searchResults: Noticia[] = [];
  showDropdown: boolean = false;

  constructor(private userService: UserService, private lastNewsService: LastNewsService, private sharedPopupService: SharedPopupService ) {
    this.user = null;
  }

  ngOnInit() {
    this.userService.getLoggedInUser().subscribe((user) => {
      this.user = user
      this.updateLoggedInValue(!!user);
      // Update the value of loggedIn
    });

  }

  search() {
    this.lastNewsService.fetchAndDisplayPosts().subscribe((response) => {
      // Maneja la respuesta de la API aquí
      if (response.articles) {
        const searchTermLowerCase = this.searchTerm.toLowerCase(); // Convierte el término de búsqueda a minúsculas

        // Filtra los artículos que contienen el término de búsqueda en su título
        this.searchResults = response.articles.filter((article: any) => // Agrega el tipo 'any' o el tipo adecuado si lo conoces
          article.title.toLowerCase().includes(searchTermLowerCase)
        );

        console.log(this.searchResults);
      }
    });
  }

  selectResult(result: Noticia) {
    this.searchResultSelected.emit(result);
    this.sharedPopupService.openPopup(result);
    this.sharedPopupService.setBusquedaDesdeNavBar(true);
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

  performSearch() {
    // Realiza la búsqueda aquí
    console.log("Búsqueda realizada: " + this.searchTerm);
    // llama a la función de búsqueda.
    this.search();
  }

  toggleDropdown() {
    console.log(this.showDropdown);
    this.showDropdown = !this.showDropdown;
  }

  
}