import { HttpClient } from '@angular/common/http'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../components/Services/user.service';
import { User } from 'src/app/models/user.model'
import { Noticia } from '../models/noticia.model';
import { LastNewsService } from '../components/Services/last-news.service';
import { SharedPopupService } from '../components/Services/sharedPopup';
import * as stringSimilarity from 'string-similarity'


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

  constructor(private userService: UserService, private lastNewsService: LastNewsService, private sharedPopupService: SharedPopupService, private http: HttpClient) {
    this.user = null;
  }

  ngOnInit() {
    this.userService.getLoggedInUser().subscribe((user) => {
      this.user = user
      this.updateLoggedInValue(!!user);
      // Update the value of loggedIn
    });

  }
 
  ngOnDestroy(){
    this.searchResults = [];
    this.closePopup();
    
  }

  search() {
    const searchTermLowerCase = this.searchTerm.toLowerCase();
    const url = `https://newsapi.org/v2/everything?q=${searchTermLowerCase}&language=en&apiKey=e88601fed28f488b8bbaf8c0d51cf962`;
  
    this.http.get(url).subscribe(
      (response: any) => {
        if (response.articles && response.articles.length > 0) {
          const filteredResults = response.articles
            .filter((article: any) =>
              article.title.toLowerCase().includes(searchTermLowerCase)
            )
            .slice(0, 10); 
  
          this.searchResults = filteredResults;
          console.log('Resultados después de la búsqueda:', this.searchResults);
        } else {
          console.log('No hay datos disponibles en la respuesta.');
        }
      },
      (error) => {
        console.error('Error al obtener datos de la API:', error);
      }
    );
  }


  selectResult(result: Noticia) {
    this.searchResultSelected.emit(result);
    ;
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
    this.sharedPopupService.closePopup();
  }

  closePopup1() {
    this.showPopup1 = false;
    this.sharedPopupService.closePopup();
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

  onEnterKeyPress(event: Event) {
    if (event instanceof KeyboardEvent && event.key === 'Enter') {
      this.performSearch();
      this.toggleDropdown();
    }
  }
}