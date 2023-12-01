import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from '../core/layout/layout.module';
import { ListUsuariosComponent } from './list-usuarios/list-usuarios.component';
import { CreateUsuariosComponent } from './list-usuarios/create-usuarios/create-usuarios.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './main/main.component';
import { VerPdfComponent } from './ver-pdf/ver-pdf.component';


@NgModule({
  declarations: [
    ListUsuariosComponent,
    CreateUsuariosComponent,
    MainComponent,
    VerPdfComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule
  ]
})
export class DashboardModule { }
