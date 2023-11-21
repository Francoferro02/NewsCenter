import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoticiasDestacadasComponent } from './components/noticias-destacadas/noticias-destacadas.component';
import { BusinessComponent } from './components/business/business.component';
import { SportsComponent } from './components/sports/sports.component';
import { TechnologyComponent } from './components/technology/technology.component';
import { HealthComponent } from './components/health/health.component';
import { UsuarioComponentComponent } from './components/usuario-component/usuario-component.component';
import { ScienceComponent } from './components/science/science.component';
import { EntertainmentComponent } from './components/entertainment/entertainment.component';
import { AuthGuard } from './auth.guard';
import { GridDestacadasComponent } from './grid-destacadas/grid-destacadas.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';

const routes: Routes = [
  {path: '', redirectTo: 'LastNews', pathMatch: 'full'},
  {path: 'Science', component:ScienceComponent},
  {path: 'LastNews', component:NoticiasDestacadasComponent},
  {path: 'Bussiness', component:BusinessComponent},
  {path: 'Entertainment', component:EntertainmentComponent},
  {path:'Sports', component:SportsComponent },
  {path: 'Tech', component:TechnologyComponent},
  {path: 'Health', component:HealthComponent},
  {path: 'Profile',component: UsuarioComponentComponent,canActivate: [AuthGuard],},
  {path: 'Destacadas', canActivate: [AuthGuard], component: GridDestacadasComponent},
  {path: 'login', component: LoginFormComponent},
  {path: 'signup', component: SignUpFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
