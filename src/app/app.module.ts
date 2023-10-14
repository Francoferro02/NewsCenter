import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoticiasDestacadasComponent } from './components/noticias-destacadas/noticias-destacadas.component';
import { FooterComponent } from './footer/footer.component';
import { UsuarioComponentComponent } from './components/usuario-component/usuario-component.component';
import { UserComentsComponent } from './user-coments/user-coments.component';
import { SportsComponent } from './components/sports/sports.component';
import { EntertainmentComponent } from './components/entertainment/entertainment.component';
import { BusinessComponent } from './components/business/business.component';
import { GeneralComponent } from './components/general/general.component';
import { HealthComponent } from './components/health/health.component';
import { ScienceComponent } from './components/science/science.component';
import { TechnologyComponent } from './components/technology/technology.component';
import { SideNavBarComponent } from './Side-nav-bar/side-nav-bar.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { BodyComponent } from './body/body.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    NoticiasDestacadasComponent,
    FooterComponent,
    UsuarioComponentComponent,
    UserComentsComponent,
    SportsComponent,
    EntertainmentComponent,
    BusinessComponent,
    GeneralComponent,
    HealthComponent,
    ScienceComponent,
    TechnologyComponent,
    SideNavBarComponent,
    NavBarComponent,
    BodyComponent,
    NavMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
