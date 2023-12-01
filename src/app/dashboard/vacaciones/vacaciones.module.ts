import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { VacacionesRoutingModule } from './vacaciones-routing.module';
import { ListVacacionesComponent } from './list-vacaciones/list-vacaciones.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MaterialModule } from 'src/app/core/shared/material.module';
import { SolicitarVacacionesComponent } from './solicitar-vacaciones/solicitar-vacaciones.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    ListVacacionesComponent,
    SolicitarVacacionesComponent
  ],
  imports: [
    CommonModule,
    VacacionesRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    NgxMatSelectSearchModule,
    NgbModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
  providers: [DatePipe],
})
export class VacacionesModule { }
