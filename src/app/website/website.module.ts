import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteRoutingModule } from './website-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { WebsiteComponent } from './website.component';
import { MatIconModule } from '@angular/material/icon';
import { SolicitudComponent } from './solicitud/solicitud.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    InicioComponent,
    WebsiteComponent,
    SolicitudComponent
  ],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class WebsiteModule { }
