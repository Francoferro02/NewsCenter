import { HttpClient } from '@angular/common/http'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../components/Services/user.service';
import { User } from 'src/app/models/user.model'
import { Noticia } from '../models/noticia.model';
import { LastNewsService } from '../components/Services/last-news.service';
import { SharedPopupService } from '../components/Services/sharedPopup';
import { AuthServiceService } from '../components/Services/auth-service.service';
import { ElementRef } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private userService: UserService,
              private lastNewsService: LastNewsService,
              private sharedPopupService: SharedPopupService,
              private http: HttpClient,
              private authService: AuthServiceService,
              private el: ElementRef,
              private router: Router) {
    this.user = null;
  }

  ngOnInit() {
    this.userService.getLoggedInUser().subscribe((user) => {
      this.user = user
      this.updateLoggedInValue(!!user);
      // Update the value of loggedIn
    });

    document.addEventListener('click', this.onDocumentClick.bind(this));
  }
 
  ngOnDestroy(){
    this.searchResults = [];
    this.closePopup();
    
    document.removeEventListener('click', this.onDocumentClick);
  }

  search() {
    const searchTermLowerCase = this.searchTerm.toLowerCase();
    const url = `https://newsapi.org/v2/everything?q=${searchTermLowerCase}&language=en&apiKey=506f9030df57473095658d41f2da32f2`;
    /* 506f9030df57473095658d41f2da32f2 */
  
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
    this.sharedPopupService.setBusquedaDesdeNavBar(true);

  // Emitir la noticia seleccionada antes de abrir el popup
  this.searchResultSelected.emit(result);

  // Abrir el popup después de emitir la noticia seleccionada
  this.sharedPopupService.openPopup(result);

  // Limpiar el campo de búsqueda y los resultados
  this.searchTerm = '';
  this.searchResults = [];
  this.toggleDropdown()
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
    this.authService.desAutenticar();

    this.router.navigate(['/']); 
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
    this.showDropdown = !this.showDropdown;

    if (!this.showDropdown) {
      this.searchTerm = '';
      this.searchResults = [];
    }
  }

  onEnterKeyPress(event: Event) {
    if (event instanceof KeyboardEvent && event.key === 'Enter') {
      this.performSearch();
      if(!this.showDropdown){
        this.toggleDropdown();
      }
      
    }
  }

  onDocumentClick(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    const isInsideSearchContainer = this.el.nativeElement.contains(clickedElement);

    if (!isInsideSearchContainer && this.showDropdown) {
      this.toggleDropdown(); // Cierra la lista de resultados si el clic fue fuera del área de búsqueda
    }
  }






}