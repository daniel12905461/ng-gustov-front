import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpleadosRoutingModule } from './empleados-routing.module';
import { ListaEmpleadosComponent } from './lista-empleados/lista-empleados.component';
import { CrearEmpleadosComponent } from './crear-empleados/crear-empleados.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MaterialModule } from 'src/app/core/shared/material.module';


@NgModule({
  declarations: [
    ListaEmpleadosComponent,
    CrearEmpleadosComponent
  ],
  imports: [
    CommonModule,
    EmpleadosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MaterialModule
  ]
})
export class EmpleadosModule { }
