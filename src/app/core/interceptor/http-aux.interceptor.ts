import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class HttpAuxInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    // // Verificar si la solicitud es de un tipo específico
    // if (request.method === 'GET' && request.url.includes('excluir-transformacion')) {
    //   // Si es una solicitud que quieres excluir, simplemente pasar sin hacer ninguna modificación
    //   return next.handle(request);
    // }

    // request = request.clone({
    //   url: `${environment.serverBaseUrl}${request.url}`
    // });

    request = request.clone({ url: environment.serverBaseUrl + request.url });

    return next.handle(request);
  }
}
