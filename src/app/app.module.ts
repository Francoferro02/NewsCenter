import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoticiaComponent } from './noticia/noticia.component';
import { BarraLateralComponent } from './barra-lateral/barra-lateral.component';
import { NoticiasDestacadasComponent } from './noticias-destacadas/noticias-destacadas.component';
import { FooterComponent } from './footer/footer.component';
import { UsuarioComponentComponent } from './usuario-component/usuario-component.component';

@NgModule({
  declarations: [
    AppComponent,
    NoticiaComponent,
    BarraLateralComponent,
    NoticiasDestacadasComponent,
    FooterComponent,
    UsuarioComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
