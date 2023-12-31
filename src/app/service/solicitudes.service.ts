import { Injectable } from '@angular/core';
import { BaseApiClass } from '../core/base-api';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService extends BaseApiClass {

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
    // this.baseUrl = 'solicitudes';
    this.baseUrl = environment.serverBaseUrl+'solicitudes';
  }
  
  pdfSolicitudHoja(id: any) {
    return this.httpClient.get(this.baseUrl + `/pdf/solicitud?id=${id}`,{
      responseType: 'blob'
    });
  }
}