import { Injectable } from '@angular/core';
import { BaseApiClass } from '../base-api';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseApiClass {

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
    this.baseUrl = 'usuarios';
  }
}