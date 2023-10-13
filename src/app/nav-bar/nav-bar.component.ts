import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
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
}
