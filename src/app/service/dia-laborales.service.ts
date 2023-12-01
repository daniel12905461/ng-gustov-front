import { Injectable } from '@angular/core';
import { BaseApiClass } from '../core/base-api';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DiaLaboralesService extends BaseApiClass {

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
    this.baseUrl = environment.serverBaseUrl+'dia-laborales';
  }
}

