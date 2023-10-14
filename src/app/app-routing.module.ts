import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoticiasDestacadasComponent } from './noticias-destacadas/noticias-destacadas.component';
import { BodyComponent } from './body/body.component';


const routes: Routes = [
  {path: '', redirectTo: 'LastNews', pathMatch: 'full'},
  {path: 'LastNews', component:NoticiasDestacadasComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
