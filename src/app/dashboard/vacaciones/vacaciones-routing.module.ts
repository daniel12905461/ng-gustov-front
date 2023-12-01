import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListVacacionesComponent } from './list-vacaciones/list-vacaciones.component';
import { SolicitarVacacionesComponent } from './solicitar-vacaciones/solicitar-vacaciones.component';

const routes: Routes = [
  {
    path:'',
    component: ListVacacionesComponent,
  },
  {
    path:'solicitar-vacaciones',
    component: SolicitarVacacionesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VacacionesRoutingModule { }
