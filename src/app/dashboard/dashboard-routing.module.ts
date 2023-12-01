import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ListUsuariosComponent } from './list-usuarios/list-usuarios.component';
import { AuthGuardService } from '../core/service/auth-guard.service';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path:'',
    component: DashboardComponent,
    children:[
      {
        path:'usuarios',
        component: ListUsuariosComponent,
        // canActivate: [AuthGuardService]
      },
      {
        path:'inicio',
        component: MainComponent,
        // canActivate: [AuthGuardService]
      },
      {
        path: 'empleados',
        loadChildren: () => import('./empleados/empleados.module').then(m => m.EmpleadosModule)
      },
      {
        path: 'vacaciones',
        loadChildren: () => import('./vacaciones/vacaciones.module').then(m => m.VacacionesModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
