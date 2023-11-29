import { Injectable } from '@angular/core';
import { BaseApiClass } from '../core/base-api';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService extends BaseApiClass {

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
    this.baseUrl = 'solicitudes';
  }
  
}