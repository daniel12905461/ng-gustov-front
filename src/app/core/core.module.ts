import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { LayoutModule } from './layout/layout.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpAuxInterceptor } from './interceptor/http-aux.interceptor';
import { JwtInterceptor } from './interceptor/jwt.interceptor';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoreRoutingModule,
    LayoutModule
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: HttpAuxInterceptor,
    //   multi: true
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
  ]
})
export class CoreModule { }
