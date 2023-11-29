import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebsiteComponent } from './website.component';
import { InicioComponent } from './inicio/inicio.component';
import { SolicitudComponent } from './solicitud/solicitud.component';

const routes: Routes = [
  {
    path:'',
    component: WebsiteComponent,
    children:[
      {
        path:'inicio',
        component: InicioComponent,
        // canActivate: [AuthGuardService]
      },
      {
        path:'solicitud',
        component: SolicitudComponent,
        // canActivate: [AuthGuardService]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }
