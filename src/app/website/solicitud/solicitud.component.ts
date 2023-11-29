import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { AlertSwallService } from 'src/app/core/service/alert-swall.service';
import { PlanesService } from 'src/app/service/planes.service';
import { SolicitudesService } from 'src/app/service/solicitudes.service';
import { ZonasService } from 'src/app/service/zonas.service';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit {

  isLoading = false;
  form!: FormGroup;
  zonas: any;
  planes: any;
  
  constructor(
    private formBuilder: FormBuilder,
    public zonasService: ZonasService,
    public planesService: PlanesService,
    public solicitudesService: SolicitudesService,
    public alertSwal: AlertSwallService
  ) {
  }

  ngOnInit(): void {
    this.createForm();
    this.listZonas();
    this.listPlanes();
  }

  createForm() {
    this.form = this.formBuilder.group({
      nombre_completo: ['', [Validators.required]],
      ci: ['', [Validators.required]],
      celular: ['', [Validators.required]],
      email: [''],
      direccion: ['', [Validators.required]],
      zona_id: ['', [Validators.required]],
      plan_internet_id: ['', [Validators.required]],
    });
  }

  
  listZonas(){
    this.zonasService.getAll().subscribe(res => {
      this.zonas = res.data;
      console.log(res);
    });
  }
  
  listPlanes(){
    this.planesService.getAll().subscribe(res => {
      this.planes = res.data;
      console.log(res);
    });
  }

  register(form: any) {
    this.isLoading = true;
    this.solicitudesService
      .create(form)
      .pipe(
        finalize(() => {
          this.form.markAsPristine();
          this.isLoading = false;
        })
      )
      .subscribe(
        data => {
          this.alertSwal.showSwallSuccess(data.success);
        },
        (error: any) => {
          this.alertSwal.showSwallError(error.error);
        }
      );
  }
}
