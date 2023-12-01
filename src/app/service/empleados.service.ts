import { Injectable } from '@angular/core';
import { BaseApiClass } from '../core/base-api';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService extends BaseApiClass {

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
    this.baseUrl = environment.serverBaseUrl+'empleados';
  }

  getVacacionesEmpleado(id: any) {
    return this.httpClient.get<any>(
      `${this.baseUrl}/vacaciones/${id}`
    );
  }
}
