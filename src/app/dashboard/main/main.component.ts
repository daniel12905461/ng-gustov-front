import { Component } from '@angular/core';
import { SolicitudesService } from 'src/app/service/solicitudes.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent  {
  pendientes: any;

  constructor(
    private baseService: SolicitudesService
  ) {   
    this.solicitudesPendientes();  
  }

  solicitudesPendientes() {
    this.baseService.getAll({'estado':'Pendiente'}).subscribe(data=>{
      this.pendientes = data.data;

      console.log(data);
      

    })
  }

  

}
